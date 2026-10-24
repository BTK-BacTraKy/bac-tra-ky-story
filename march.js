/* BÁC TRÀ KÝ · V4.7 · MỞ ĐƯỜNG HÀNH QUÂN
   Separate, testable point-and-click puzzle. Historical march is fictional gameplay.
   Loaded AFTER game.js, using its basePipe/pipeState/advanceHistory helpers.
*/
(() => {
  'use strict';
  const DIR = ['N','E','S','W'];
  const OPP = {N:'S',E:'W',S:'N',W:'E'};
  const DELTA = {N:-3,E:1,S:3,W:-1};
  const INITIAL = [1,2,1,0,1,1,3,2,1];
  const WALK_MS = 700;
  const WARNING_MS = 2800;
  const HARD_WARNING_MS = 1900;
  const state = {
    stage:'ready', mode:'normal', lives:3, turns:0,
    current:-1, entry:'W', visited:new Set(), busy:false,
    epoch:0, nextTimer:null, failTimer:null, noticeTimer:null,
    root:null, status:'Chờ lệnh xuất quân', warning:'', lastFailure:'',
    feedback:'Xoay các mảnh địa đồ, sau đó phát lệnh. Quân sẽ đi theo đường đã mở.',
  };
  const $ = (sel) => state.root && state.root.querySelector(sel);
  const sound = (name) => {
    try { if (typeof foley==='function') foley(name); else if(typeof tone==='function') tone(400,.08); } catch (_) {}
  };
  const side = (tile,dir) => ({N:tile-3,E:tile+1,S:tile+3,W:tile-1})[dir];
  const inside = (a,b,dir) => b >= 0 && b < 9 && (dir==='E'?Math.floor(a/3)===Math.floor(b/3):dir==='W'?Math.floor(a/3)===Math.floor(b/3):true);
  const ports = (i) => basePipe[i].map(d => DIR[(DIR.indexOf(d) + pipeState[i]) % 4]);
  const stepAhead = () => {
    if(state.current===-1) return ports(0).includes('W')?{next:0,incoming:'W'}:{block:'Cổng xuất phát chưa mở về phía bản đồ.'};
    const current = state.current;
    const directions = ports(current);
    if(!directions.includes(state.entry)) return {block:'Đường dưới chân quân đã bị xoay lệch.'};
    const exit = directions.find(d=>d!==state.entry);
    if(!exit) return {block:'Quân đã đi vào ngõ cụt.'};
    if(current===8 && exit==='E') return {win:true};
    const next=side(current,exit);
    if(!inside(current,next,exit)) return {block:'Lối đi dẫn ra khỏi địa đồ.'};
    if(state.visited.has(next)) return {block:'Toán quân đang quay lại lối cũ.'};
    if(!ports(next).includes(OPP[exit])) return {block:'Hai mảnh đường phía trước chưa nối khít.'};
    return {next,incoming:OPP[exit]};
  };
  const clearTimers = () => {
    [state.nextTimer,state.failTimer,state.noticeTimer].forEach(x=>clearTimeout(x));
    state.nextTimer=null;state.failTimer=null;state.noticeTimer=null;
  };
  const playAudio = (type) => {
    if(type==='move') sound('drop');
    else if(type==='turn') sound('click');
    else if(type==='fail') sound('fail');
    else if(type==='win') {sound('gong'); if(typeof soundWin==='function') soundWin();}
  };
  const stateCaption = () => ({ready:'Đang chuẩn bị',marching:state.warning?'Đường bị chặn':'Đang hành quân',retry:'Cần tập hợp lại',gameover:'Thất bại',won:'Toàn thắng'})[state.stage];
  const point = (i) => i===-1?{x:-6.5,y:16.666}:{x:(i%3+.5)/3*100,y:(Math.floor(i/3)+.5)/3*100};
  const armySVG = `<svg class="march-army-svg" viewBox="0 0 120 96" aria-hidden="true">
    <ellipse cx="58" cy="82" rx="45" ry="10" fill="rgba(38,22,10,.32)"/>
    <g class="troop-rear"><path d="M18 51l-5 20 21 0-6-20Z" fill="#654b35" stroke="#39291c" stroke-width="2"/><circle cx="23" cy="42" r="11" fill="#d8ac77" stroke="#65472b" stroke-width="2"/><path d="M12 44Q23 24 35 44Z" fill="#5a563c"/><path d="M18 70l-2 12M28 70l4 12" stroke="#4a3627" stroke-width="5"/></g>
    <g class="troop-rear"><path d="M79 49l-4 23 21-1-5-22Z" fill="#6c4b31" stroke="#37251d" stroke-width="2"/><circle cx="86" cy="40" r="11" fill="#d4a475" stroke="#65472b" stroke-width="2"/><path d="M74 42Q87 19 97 42Z" fill="#5c543c"/><path d="M80 70l-2 12M91 70l3 12" stroke="#4a3627" stroke-width="5"/></g>
    <g class="troop-leader"><path d="M43 49l-6 27 37 0-7-27Z" fill="#87382d" stroke="#4e241d" stroke-width="2.5"/><path d="M48 52L60 58L69 51" fill="none" stroke="#dbb579" stroke-width="3"/><circle cx="56" cy="38" r="13" fill="#ddb483" stroke="#6a462a" stroke-width="2"/><path d="M42 38Q55 12 70 36Z" fill="#584b31" stroke="#352919" stroke-width="2"/><path d="M48 75l-2 12M66 75l3 12" stroke="#503324" stroke-width="5"/></g>
    <path d="M61 20V4" stroke="#63442b" stroke-width="4" stroke-linecap="round"/>
    <g class="march-banner"><path d="M62 5C76-1 81 15 103 7L100 39C85 45 75 25 62 32Z" fill="#94352d" stroke="#64241c" stroke-width="2"/><path d="M72 13Q82 10 92 18L88 27Q78 18 72 23Z" fill="#d7a15d"/></g>
  </svg>`;
  const tileSVG = (idx) => {
    const tracks = basePipe[idx].map(d => ({N:'M50 50 L50 -4',E:'M50 50 L104 50',S:'M50 50 L50 104',W:'M50 50 L-4 50'})[d]);
    const roads = tracks.map(path=>`<path d="${path}" class="road-under"/><path d="${path}" class="road-main"/><path d="${path}" class="road-rut"/>`).join('');
    return `<svg class="march-road-svg" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M8 14 Q38 25 83 10 M4 74 Q40 56 93 81 M14 97 Q47 77 83 97" class="map-etch"/>
      <circle cx="50" cy="50" r="22" class="map-stain"/>
      ${roads}<circle cx="50" cy="50" r="10" class="road-hub"/>
      <path d="M47 50h6M50 47v6" stroke="#a77545" stroke-width="1.4" opacity=".5"/>
    </svg>`;
  };
  const iconStart = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M13 34V6" stroke="#bfa071" stroke-width="3"/><path d="M15 8Q27 3 33 12L29 23Q22 15 15 18Z" fill="#a53d31" stroke="#5b2922" stroke-width="1.5"/><path d="M7 34H22" stroke="#e5c28c" stroke-width="3"/></svg>`;
  const iconGoal = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M12 35V7" stroke="#bfa071" stroke-width="3"/><path d="M15 8Q26 4 34 12L30 23Q24 18 15 19Z" fill="#d9b366" stroke="#6e402a" stroke-width="1.5"/><path d="M6 35H22" stroke="#e5c28c" stroke-width="3"/></svg>`;
  const tileLabel=(i)=>String(i+1).padStart(2,'0');
  const boardHTML = () => `<div class="march-game">
      <div class="march-heading"><span class="march-eyebrow">BINH PHÁP · GIẢI ĐỐ TƯƠNG TÁC</span><h4 class="serif">Mở đường hành quân</h4><p>Tính thế trận trước khi xuất quân. Khi trống lệnh vang lên, đội quân sẽ tiến theo đường thông — bạn chỉ còn có thể xoay những mảnh chưa đi qua.</p></div>
      <div class="march-hud">
        <div class="march-stat"><small>TRẠNG THÁI</small><strong id="marchStatus">Chờ xuất quân</strong></div>
        <div class="march-stat"><small>LƯỢT XOAY</small><strong id="marchTurns">0</strong></div>
        <div class="march-stat"><small>TIẾN ĐỘ</small><strong id="marchDistance">0/9</strong></div>
      </div>
      <div class="march-modes" role="group" aria-label="Chế độ khó"><span>THỬ THÁCH</span><button id="marchNormal" class="march-mode active" aria-pressed="true">3 mạng</button><button id="marchHard" class="march-mode" aria-pressed="false">Một sai lầm</button></div>
      <div class="march-lives" aria-label="Số mạng còn lại"><span>TIẾP VIỆN</span><div id="marchLifeIcons"></div><small id="marchLifeText">3 cơ hội</small></div>
      <div class="march-board-frame" id="marchBoardFrame">
        <div class="march-board-top"><span class="march-board-symbol">✦</span><span>ĐỊA ĐỒ TRONG MƯA</span><span class="march-board-symbol">✦</span></div>
        <div class="march-board-area"><div class="march-marker march-marker-start" title="Doanh trại">${iconStart}<span>XUẤT PHÁT</span></div>
          <div class="march-tiles" id="marchTiles" role="group" aria-label="Bản đồ 3 nhân 3 gồm các mảnh đường xoay được">
            ${basePipe.map((_,i)=>`<button type="button" class="march-tile" data-i="${i}" aria-label="Mảnh địa đồ ${i+1}, nhấn để xoay 90 độ"><span class="march-tile-ink">${tileSVG(i)}</span><span class="march-cell-no">${tileLabel(i)}</span><span class="march-tile-burn"></span></button>`).join('')}
            <div class="march-unit" id="marchUnit" aria-hidden="true">${armySVG}</div>
          </div>
          <div class="march-marker march-marker-goal" title="Cờ tập kết">${iconGoal}<span>ĐÍCH ĐẾN</span></div>
        </div>
        <div class="march-board-bottom"><span>ĐỊA ĐỒ MÔ PHỎNG · KHÔNG PHẢI BẢN ĐỒ HÀNH QUÂN LỊCH SỬ</span><span class="march-compass">✥</span></div>
        <div class="march-overlay" id="marchOverlay" hidden></div>
      </div>
      <div class="march-message" id="marchMessage" role="status" aria-live="polite"><span class="march-message-icon">◈</span><span id="marchFeedback">Sắp xếp các mảnh đường trước khi xuất quân.</span></div>
      <div class="march-actions"><button class="action-btn march-launch" id="marchLaunch">⚑ Xuất quân</button><button class="ghost-btn" id="marchReset">↻ Xếp lại địa đồ</button><button class="ghost-btn" id="marchHint">✧ Gợi ý</button></div>
      <div class="march-help"><strong>LUẬT CHƠI</strong> Nhấn một mảnh để xoay 90°. Bấm <b>Xuất quân</b> khi bạn đã sẵn sàng. Quân sẽ tiến theo đường khớp nhau; nếu tới đường cụt, bạn chỉ có ít thời gian xoay mảnh phía trước trước khi mất một mạng. Ô quân đã đi qua sẽ bị khóa.</div>
    </div>`;
  const setMessage=(text,kind='normal')=>{state.feedback=text;const el=$('#marchFeedback');if(el)el.textContent=text;const p=$('#marchMessage');if(p)p.dataset.kind=kind;};
  const syncTile = (i) => {
    const btn=$(`.march-tile[data-i="${i}"]`);if(!btn)return;
    const inner=btn.querySelector('.march-tile-ink');
    if(inner)inner.style.transform=`rotate(${pipeState[i]*90}deg)`;
    const locked=state.visited.has(i);
    btn.classList.toggle('locked',locked);btn.classList.toggle('trodden',locked);
    btn.disabled=locked || ['won','gameover'].includes(state.stage);
    btn.setAttribute('aria-label',`Mảnh địa đồ ${i+1}${locked?', quân đã đi qua nên bị khóa':''}. Nhấn để xoay 90 độ.`);
  };
  const syncUI=()=>{
    if(!state.root)return;
    $('#marchStatus').textContent=stateCaption();
    $('#marchTurns').textContent=state.turns;
    $('#marchDistance').textContent=`${state.visited.size}/9`;
    const hearts=$('#marchLifeIcons');hearts.innerHTML=Array.from({length:state.mode==='hard'?1:3},(_,i)=>`<span class="march-shield ${i>=state.lives?'lost':''}" aria-hidden="true">◆</span>`).join('');
    $('#marchLifeText').textContent=`${state.lives} ${state.lives===1?'cơ hội':'cơ hội còn lại'}`;
    $('#marchNormal').classList.toggle('active',state.mode==='normal');$('#marchHard').classList.toggle('active',state.mode==='hard');
    $('#marchNormal').setAttribute('aria-pressed',state.mode==='normal');$('#marchHard').setAttribute('aria-pressed',state.mode==='hard');
    $('#marchNormal').disabled=state.stage==='marching';$('#marchHard').disabled=state.stage==='marching';
    const launch=$('#marchLaunch');launch.disabled=['marching','won','gameover'].includes(state.stage);
    launch.textContent=state.stage==='retry'?'⚑ Tập hợp và xuất quân lại':'⚑ Xuất quân';
    $('#marchBoardFrame').classList.toggle('march-danger',Boolean(state.warning));
    $('#marchBoardFrame').classList.toggle('march-victory',state.stage==='won');
    $('#marchBoardFrame').classList.toggle('march-defeat',state.stage==='gameover');
    for(let i=0;i<9;i++)syncTile(i);
  };
  const placeUnit = (tile, instant=false) => {
    const el=$('#marchUnit');if(!el)return;
    const {x,y}=point(tile);
    if(instant){el.style.transition='none';el.style.left=`${x}%`;el.style.top=`${y}%`;void el.offsetWidth;el.style.transition='';}
    else{el.style.left=`${x}%`;el.style.top=`${y}%`;}
    el.classList.toggle('marching',state.stage==='marching');
    el.classList.toggle('lost',state.stage==='gameover');
  };
  const dust=(idx)=>{
    const parent=$('#marchTiles');if(!parent)return;
    const at=point(idx);const puff=document.createElement('span');
    puff.className='march-dust';puff.style.left=at.x+'%';puff.style.top=at.y+'%';parent.appendChild(puff);
    setTimeout(()=>puff.remove(),700);
  };
  const hideOverlay=()=>{const el=$('#marchOverlay');if(el){el.hidden=true;el.innerHTML='';}};
  const showOverlay=(kind,heading,body,actions)=>{
    const el=$('#marchOverlay');if(!el)return;
    el.hidden=false;el.dataset.kind=kind;
    const mark=kind==='win'?'✺':'✕';
    el.innerHTML=`<div class="march-modal-card"><div class="march-result-mark">${mark}</div><span class="march-result-kicker">${kind==='win'?'NHIỆM VỤ HOÀN THÀNH':'CỜ LỆNH HẠ XUỐNG'}</span><h4 class="serif">${heading}</h4><p>${body}</p><div class="march-modal-actions">${actions}</div></div>`;
    el.querySelector('#marchReplay')?.addEventListener('click',()=>reset(true));
    el.querySelector('#marchContinue')?.addEventListener('click',()=>{stop();if(typeof advanceHistory==='function')advanceHistory()});
  };
  const showNotice = (reason)=>{
    if(state.stage!=='marching')return;
    if(!state.warning){
      state.warning=reason;
      setMessage('⚠ '+reason+' Hãy xoay mảnh chưa đi qua để nối tiếp trước khi hết thời gian!', 'warn');
      const epoch=state.epoch;
      state.failTimer=setTimeout(()=>{if(state.epoch===epoch && state.stage==='marching' && state.warning)lose(reason);},state.mode==='hard'?HARD_WARNING_MS:WARNING_MS);
      playAudio('fail');
      syncUI();
    }
  };
  const clearWarning=()=>{if(state.failTimer){clearTimeout(state.failTimer);state.failTimer=null;}state.warning='';};
  const resetArmyPosition=()=>{
    state.current=-1;state.entry='W';state.visited.clear();state.busy=false;clearWarning();placeUnit(-1,true);
  };
  const lose=(reason)=>{
    if(state.stage!=='marching')return;
    clearTimers();state.epoch++;state.lives--;
    state.stage=state.lives>0?'retry':'gameover';state.lastFailure=reason;
    state.warning='';state.busy=false;
    playAudio('fail');
    if(state.stage==='retry'){
      setMessage(`✕ ${reason} Quân phải lui lại. Bạn còn ${state.lives} lượt tiếp viện. Chỉnh địa đồ rồi xuất quân lần nữa.`, 'fail');
      state.visited.clear();placeUnit(-1,true);state.current=-1;state.entry='W';
    } else{
      setMessage('Đoàn quân không thể tiến. Hành trình thất bại.', 'fail');
      showOverlay('fail','Đường hành quân thất bại',`Toán quân bị chặn tại địa đồ. ${reason} Hãy quan sát lại các ngã rẽ trước khi xuất quân.`, `<button class="action-btn" id="marchReplay">↻ Chơi lại màn này</button>`);
    }
    syncUI();
  };
  const win=()=>{
    if(state.stage!=='marching')return;
    clearTimers();state.epoch++;state.stage='won';state.busy=false;clearWarning();
    playAudio('win');
    setMessage('Đường đã thông! Đội quân tới cờ lệnh an toàn.', 'win');
    showOverlay('win','Mở đường thành công',`Bạn đưa đội quân đến đích sau ${state.turns} lượt xoay. Cốt truyện tiếp theo dẫn tới sự kiện thành lập nước Vạn Xuân năm 544.`, `<button class="action-btn" id="marchContinue">Tiếp tục câu chuyện →</button><button class="ghost-btn" id="marchReplay">↻ Chơi lại màn</button>`);
    syncUI();
  };
  const scheduleNext=(delay=260)=>{
    clearTimeout(state.nextTimer);
    if(state.stage!=='marching'||state.busy)return;
    const epoch=state.epoch;
    state.nextTimer=setTimeout(()=>{if(epoch===state.epoch)tryAdvance();},delay);
  };
  const tryAdvance=()=>{
    if(state.stage!=='marching'||state.busy)return;
    const step=stepAhead();
    if(step.win){clearWarning();win();return;}
    if(step.block){showNotice(step.block);return;}
    clearWarning();
    state.busy=true;state.current=step.next;state.entry=step.incoming;
    const epoch=state.epoch;
    const soldier=$('#marchUnit');soldier.classList.add('stepping');
    const label=state.current===8?'Cờ đích ở ngay phía trước!':`Đội quân đang tiến qua mảnh ${state.current+1}.`;
    setMessage(label,'move');
    placeUnit(state.current);
    playAudio('move');
    state.visited.add(state.current);
    syncUI();
    state.nextTimer=setTimeout(()=>{
      if(epoch!==state.epoch)return;
      dust(state.current);soldier.classList.remove('stepping');
      state.busy=false;syncUI();
      scheduleNext(230);
    },WALK_MS);
  };
  const rotate=(i)=>{
    if(['won','gameover'].includes(state.stage)||state.visited.has(i))return;
    pipeState[i]=(pipeState[i]+1)%4;state.turns++;playAudio('turn');
    syncTile(i);
    if(state.stage==='marching'){
      // During a blockage the original deadline stays fixed; spamming turns cannot extend it.
      if(!state.busy)scheduleNext(110);
    } else if(state.stage==='ready'||state.stage==='retry'){
      setMessage('Mảnh địa đồ đã xoay. Khi sẵn sàng, hãy phát lệnh xuất quân.','normal');
    }
    syncUI();
  };
  const start=()=>{
    if(!['ready','retry'].includes(state.stage))return;
    hideOverlay();clearTimers();state.epoch++;
    state.stage='marching';resetArmyPosition();
    const el=$('#marchUnit');el.classList.add('visible');
    setMessage('Trống lệnh vang lên. Quân đang đợi lối thông từ doanh trại…','move');
    playAudio('move');syncUI();scheduleNext(450);
  };
  const reset=(all=false)=>{
    clearTimers();state.epoch++;
    pipeState.splice(0,pipeState.length,...INITIAL);
    state.turns=0;state.stage='ready';state.lives=state.mode==='hard'?1:3;
    state.current=-1;state.entry='W';state.visited.clear();state.warning='';state.busy=false;state.lastFailure='';
    hideOverlay();setMessage('Địa đồ đã được xếp lại. Xoay các mảnh rồi phát lệnh.','normal');
    const el=$('#marchUnit');if(el){el.classList.remove('stepping','marching','lost','visible');placeUnit(-1,true);}
    syncUI();
  };
  const setMode=(mode)=>{
    if(state.stage==='marching')return;
    state.mode=mode;reset();
    setMessage(mode==='hard'?'Chế độ thử thách: chỉ một lần bị chặn là thất bại.':'Chế độ thường: có ba lượt tiếp viện để thử lại.','normal');
  };
  const hint=()=>{
    const tips=[
      'Lối ra của doanh trại nằm ở mép trái ô 1. Đầu tiên hãy đảm bảo ô 1 có cổng mở về phía Tây.',
      'Đường nối phải khớp ở cả hai đầu mảnh ghép. Xoay một mảnh không đồng nghĩa mảnh bên cạnh đã thông.',
      'Có thể đi qua một dải đường vòng. Quan sát các mảnh ở hàng giữa và hàng dưới — không cần dùng hết cả 9 ô.',
      'Sau khi xuất quân, chỉ xoay được ô chưa đặt chân tới. Hãy dự tính những khúc cua trước lúc quân tiến.'
    ];
    const idx=Math.min(3,Math.floor(state.turns/5));
    setMessage('✧ '+tips[idx],'hint');
  };
  const mount=(target)=>{
    stop();
    state.root=document.querySelector(target);
    if(!state.root)return;
    state.root.innerHTML=boardHTML();
    for(let i=0;i<9;i++){
      $(`.march-tile[data-i="${i}"]`).addEventListener('click',()=>rotate(i));
    }
    $('#marchLaunch').addEventListener('click',start);
    $('#marchReset').addEventListener('click',()=>reset());
    $('#marchHint').addEventListener('click',hint);
    $('#marchNormal').addEventListener('click',()=>setMode('normal'));
    $('#marchHard').addEventListener('click',()=>setMode('hard'));
    const el=$('#marchUnit');el.style.left='-6.5%';el.style.top='16.666%';
    syncUI();
  };
  const stop=()=>{
    clearTimers();state.epoch++;
    if(state.stage==='marching'){state.stage='retry';state.busy=false;state.warning='';}
  };
  window.BTKMarch={mount,reset,stop,state,debug:{ports,stepAhead,rotate,start,tryAdvance,win,lose,setMode}};
})();
