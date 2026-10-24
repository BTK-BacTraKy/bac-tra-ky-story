'use strict';
/* BÁC TRÀ KÝ – MỞ BÁNH MỞ CHUYỆN | V4.5 STABLE
   Interactive story is fictionalized. Historical anchors are source-annotated.
   Deploy by uploading index.html, styles.css, game.js and assets/ to repo root.
*/
const SETTINGS={beaconsUrl:''};
if(SETTINGS.beaconsUrl.startsWith('https://')){document.addEventListener('DOMContentLoaded',()=>{const back=document.getElementById('beaconsReturn');if(back){back.href=SETTINGS.beaconsUrl;back.hidden=false;}});}
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
let lastMode='home', audioOn=false, ctx=null, toastTimeout;
function tone(freq=440,duration=.11){if(!audioOn)return;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.12,ctx.currentTime+.018);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);o.connect(g).connect(ctx.destination);o.start();o.stop(ctx.currentTime+duration+.02);}catch(e){}}
function soundWin(){tone(440,.12);setTimeout(()=>tone(587,.16),115);setTimeout(()=>tone(784,.28),245)}
function toast(msg){const t=$('#historyToast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>t.classList.remove('show'),2500)}
function showView(id){if(id!=='history' && window.BTKMarch)window.BTKMarch.stop();if(id!=='about')lastMode=id;$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));window.scrollTo({top:0,behavior:'instant'});document.title=`Bác Trà Ký | ${id==='history'?'Theo bước Lý Nam Đế':id==='cake'?'Thử tài làm Bánh Bác':id==='about'?'Nguồn tư liệu':'Mở Bánh – Mở Chuyện'}`;if(id!=='cake')stopCook();}
$('#startHistory').onclick=()=>{historyStage=0;reinitializePuzzles();renderHistory();showView('history')};
$('#startCake').onclick=()=>{resetCake();showView('cake')};
$('#historyHome').onclick=()=>showView('home');$('#cakeHome').onclick=()=>showView('home');
$('#historyRestart').onclick=()=>{if(!confirm('Bắt đầu lại toàn bộ hành trình lịch sử?'))return;historyStage=0;reinitializePuzzles();renderHistory()};
$('#historySource').onclick=()=>showView('about');$('#aboutBack').onclick=()=>showView(lastMode==='about'?'home':lastMode);
$('#audioToggle').onclick=()=>{audioOn=!audioOn;$('#audioToggle').setAttribute('aria-pressed',String(audioOn));$('#audioToggle span').textContent=audioOn?'Âm bật':'Âm tắt';tone(530,.15)};
$$('.header a[href="#home"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showView('home')}));
$$('.header-back').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showView('home')}));

const SOURCES=[
  {label:'Thế giới Di sản (2016) – Lý Nam Đế trong đời sống Giang Xá',href:'https://thegioidisan.vn/vi/ly-nam-de-trong-doi-song-van-hoa-cua-nguoi-dan-lang-giang-xa-huyen-hoai-duc-ha-noi.html'},
  {label:'Thành ủy Hà Nội (2024) – Hội thảo dấu ấn Lý Nam Đế và Vạn Xuân ở Hoài Đức',href:'https://thanhuyhanoi.vn/tin-tuc/huyen-hoai-duc/hoi-thao-khoa-hoc-dau-an-cua-ly-nam-de-va-nha-nuoc-van-xuan-tren-dia-ban-huyen-hoai-duc-10037123.html'},
  {label:'Bảo tàng Lịch sử Quốc gia (2014) – Vạn Xuân năm 544',href:'https://baotanglichsuquocgia.vn/vi/Articles/2001/68142/thang-2-544-ly-nam-dje-tuyen-bo-dung-nuoc-djoc-lap-quoc-hieu-van-xuan.html'},
  {label:'Quân đội nhân dân (2025) – Kỳ công món Bánh Bác Giang Xá',href:'https://www.qdnd.vn/du-lich/cac-van-de/ky-cong-mon-banh-tien-vua-cua-lang-giang-xa-809665'}
];
const HIST=[
 {name:'CỔNG LÀNG GIANG XÁ',title:'Dấu hiệu ở Linh Bảo',objective:'Ba tín vật trong làng',desc:'Tìm ba tín vật đang tỏa sáng trong tranh. Chạm để thu thập; dùng câu gợi ý khắc trên phiến đá để mở sớ.',art:'assets/village.webp',tag:'GIANG XÁ • TRUYỀN THỐNG ĐỊA PHƯƠNG',dialogue:['Ta là Lý Bí. Có lời kể rằng Giang Xá từng là nơi ta học tập và nuôi chí lớn.','Một cuốn sớ cũ được giấu trong làng. Muốn tìm nó, trước hết cần ba dấu hiệu.','Hãy để ý trong bức tranh. Không phải mọi vật đều đứng yên.'],lore:'Những thần tích và truyền thuyết địa phương gắn tuổi trẻ Lý Bí với chùa Linh Bảo ở Giang Xá. Chi tiết ông từng ở và học tại đây được nhắc trong nghiên cứu văn hóa địa phương, nhưng cách dựng cảnh và các tín vật là hoàn toàn hư cấu.',refs:[0,1]},
 {name:'GIAN THƯ TRONG CHÙA',title:'Mật thư của người dựng nghiệp',objective:'Phục dựng trang mật thư',desc:'Tấm tranh bị xáo thành chín mảnh. Chạm ô cạnh khoảng trống để trượt hình về đúng vị trí ban đầu.',art:'assets/temple.webp',tag:'CẢNH HƯ CẤU • CĂN CỨ CHUẨN BỊ KHỞI NGHĨA',dialogue:['Đầu năm 542, cuộc khởi nghĩa chống nhà Lương bùng lên. Một quyết định lớn phải được chuẩn bị kỹ lưỡng.','Trang mật thư trước mặt đã bị chia cắt. Hãy trả lại từng mảnh hình đúng chỗ.','Khi bức tranh liền lại, ta sẽ tìm được dấu dẫn đường kế tiếp.'],lore:'Lý Bí lãnh đạo khởi nghĩa chống nhà Lương năm 542. Tư liệu về Hoài Đức nhắc đến Giang Xá, Lưu Xá như những không gian gắn với thời kỳ dựng nghiệp. Không có chứng cứ về “mật thư ghép tranh” trong trò chơi này.',refs:[1,2]},
 {name:'TRƯỚC GIỜ DỰNG CỜ',title:'Mở đường hành quân',objective:'Đưa quân vượt đường mưa',desc:'Xoay địa đồ rồi phát lệnh xuất quân. Quân sẽ tự đi trên lối thông; nếu kẹt ngõ cụt, bạn mất một lượt tiếp viện.',art:'assets/warcamp.webp',tag:'ẨN DỤ GAMEPLAY • KHÔNG PHẢI BẢN ĐỒ HÀNH QUÂN THẬT',dialogue:['Đêm mưa gấp gáp. Người dẫn đường đã đánh rơi một phần địa đồ. Hãy mở lối cho đội quân.','Hãy tính các ngã rẽ trước khi xuất quân. Một khi cờ lệnh đã phất lên, quân sẽ tự hành tiến.','Địa đồ này chỉ là trò giải đố lấy cảm hứng từ cuộc khởi nghĩa năm 542, không phải tuyến tiến quân có thật.'],lore:'Các nguồn lịch sử ghi nhận cuộc khởi nghĩa năm 542 và sự phát triển của lực lượng Lý Bí. Bản đồ 3×3 trong game là câu đố cơ học, không thể dùng để suy luận về địa hình, vị trí đóng quân hay tuyến tiến quân thực tế.',refs:[1,2]},
 {name:'MÙA XUÂN VẠN XUÂN',title:'Một quốc hiệu được mở ra',objective:'Khám phá kết quả hành trình',desc:'Bạn đã vượt qua các thử thách. Mở cuộn sớ cuối để đọc về sự ra đời của Vạn Xuân năm 544.',art:'assets/river.webp',tag:'SỰ KIỆN LỊCH SỬ • NĂM 544',dialogue:['Năm 544, Lý Bí xưng đế, lấy hiệu Lý Nam Đế và đặt quốc hiệu là Vạn Xuân.','Khát vọng ấy vượt khỏi một làng quê, trở thành dấu mốc lịch sử của dân tộc.','Ngày nay, Giang Xá còn gìn giữ ký ức về ông qua di tích và lễ hội. Hành trình tiếp theo đưa ta về Bánh Bác.'],lore:'Năm 544, Lý Bí xưng đế, lấy hiệu Lý Nam Đế, niên hiệu Thiên Đức và đặt quốc hiệu Vạn Xuân. Đây là mốc lịch sử được các nguồn chính thống ghi nhận. Tranh chiến thuyền, trang phục và lời thoại game không phải phục dựng chuẩn xác thế kỷ VI.',refs:[0,1,2]}
];
let historyStage=0,dialoguePos=0,runeSequence=[],found=new Set(),slideArr=[],slideMoves=0,pipeState=[],pipeTurns=0;
const relics=[{name:'Lá tre',symbol:'❧',x:21,y:67,what:'lá',kind:'leaf'},{name:'Chuông đồng',symbol:'🔔',x:72,y:31,what:'chuông',kind:'bell'},{name:'Thẻ thư',symbol:'▤',x:62,y:70,what:'thư',kind:'letter'}];
const runeOrder=['❧','🔔','▤'];
let hotspotHinting=false,hintRevealTimer=null;
function artifactMarkup(kind,label='',compact=false){const size=compact?'artifact-mini':'artifact-full';const icons={leaf:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 35C10 18 28 8 53 9C54 34 43 54 24 55C15 55 10 46 10 35Z" fill="#6d8d46" stroke="#4f6730" stroke-width="2"/><path d="M18 44C30 34 39 25 49 15" stroke="#edf7c8" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M23 40L26 49M33 31L39 38M34 24L44 27" stroke="#d8ebb2" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,bell:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M28 11C28 8 30 6 32 6C34 6 36 8 36 11V15H28Z" fill="#8e5b21"/><path d="M14 28C14 16 22 11 32 11C42 11 50 16 50 28V37C50 40 52 43 56 46H8C12 43 14 40 14 37Z" fill="#d7a448" stroke="#8c5b24" stroke-width="2"/><path d="M18 47H46C45 53 40 57 32 57C24 57 19 53 18 47Z" fill="#c78b2f" stroke="#8c5b24" stroke-width="2"/><circle cx="32" cy="48" r="4" fill="#7b4118"/></svg>`,letter:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="17" width="44" height="30" rx="3" fill="#efe1bd" stroke="#9f7746" stroke-width="2"/><path d="M11 19L32 35L53 19" fill="none" stroke="#b38a58" stroke-width="2.3"/><path d="M18 27H31" stroke="#c9a77c" stroke-width="2" stroke-linecap="round"/><path d="M18 32H28" stroke="#c9a77c" stroke-width="2" stroke-linecap="round"/><circle cx="44" cy="34" r="4.5" fill="#973a32" stroke="#7a261f" stroke-width="1"/></svg>`};return `<span class="artifact-svg ${size} ${kind}" aria-label="${label}">${icons[kind]||''}</span>`;}
function setHistoryHintGlow(on){hotspotHinting=on;document.querySelectorAll('#hotspotLayer .hotspot').forEach(el=>el.classList.toggle('revealed',on));}
const basePipe=[['W','E'],['W','S'],['S','W'],['N','E'],['N','S'],['W','S'],['E','S'],['N','E'],['W','E']];
const DIR=['N','E','S','W'],deltas=[-3,1,3,-1],opposite=[2,3,0,1];
function rotateDir(d,k){return DIR[(DIR.indexOf(d)+k)%4]}
function shuffleSlide(){slideArr=Array.from({length:9},(_,i)=>i);let last=-1;for(let i=0;i<48;i++){const b=slideArr.indexOf(8),choices=[b-3,b+3,b-1,b+1].filter(n=>n>=0&&n<9&&Math.abs(Math.floor(n/3)-Math.floor(b/3))+Math.abs((n%3)-(b%3))===1&&n!==last);const n=choices[Math.floor(Math.random()*choices.length)];last=b;[slideArr[b],slideArr[n]]=[slideArr[n],slideArr[b]]}if(slideArr.every((x,i)=>x===i))return shuffleSlide();slideMoves=0}
function reinitializePuzzles(){found=new Set();runeSequence=[];shuffleSlide();pipeState=[1,2,1,0,1,1,3,2,1];pipeTurns=0;dialoguePos=0;if(window.BTKMarch)window.BTKMarch.reset();}
reinitializePuzzles();
function renderHistory(){const scene=HIST[historyStage];dialoguePos=0;$('#chapterIndex').textContent=`CHƯƠNG 0${historyStage+1} / 04`;$('#chapterTitle').textContent=scene.title;$('#sceneArt').src=scene.art;$('#sceneArt').alt='Minh họa nghệ thuật: '+scene.name;$('#artLabel').textContent=scene.tag;$('#objectiveTitle').textContent=scene.objective;$('#objectiveText').textContent=scene.desc;$('#inventoryCount').textContent=`${found.size}/3`;$('#inventoryItems').innerHTML=[0,1,2].map(i=>`<div class="item-slot ${found.has(i)?'got':''}" title="${found.has(i)?relics[i].name:'Vật phẩm chưa tìm thấy'}">${found.has(i)?artifactMarkup(relics[i].kind,relics[i].name,true):'?'}<span class="slot-name">${found.has(i)?relics[i].name:'Chưa tìm thấy'}</span></div>`).join('');$('#hotspotLayer').innerHTML='';renderDialogue();if(historyStage===0)renderFind();else if(historyStage===1)renderSlide();else if(historyStage===2)renderPipes();else renderVictory();}
function renderDialogue(){const s=HIST[historyStage];$('#dialogueName').textContent=historyStage===3?'NGƯỜI KỂ CHUYỆN':'LÝ BÍ • LỜI THOẠI HƯ CẤU';$('#dialogueBody').textContent=s.dialogue[dialoguePos]}
$('#dialogueNext').onclick=()=>{dialoguePos=(dialoguePos+1)%HIST[historyStage].dialogue.length;renderDialogue();tone(450,.05)};
function advanceHistory(){if(historyStage>=3)return;if(window.BTKMarch)window.BTKMarch.stop();historyStage++;soundWin();renderHistory()}
function renderFind(){const layer=$('#hotspotLayer');relics.forEach((it,i)=>{if(found.has(i))return;const b=document.createElement('button');b.className=`hotspot hotspot-${it.kind}${hotspotHinting?' revealed':''}`;b.style.left=it.x+'%';b.style.top=it.y+'%';b.setAttribute('aria-label','Nhặt '+it.name);b.title='Khám phá vật phẩm';b.innerHTML=artifactMarkup(it.kind,it.name,false);b.onclick=()=>{const pos=dialoguePos;found.add(i);tone(540+i*110,.13);toast('Nhặt được: '+it.name);renderHistory();dialoguePos=pos;renderDialogue();};layer.appendChild(b)});const mount=$('#puzzleMount');mount.innerHTML=`<h4>✦ Ấn ký Linh Bảo</h4><p>Phiến đá có lời dẫn: <em>“Lá lay trước gió — chuông ngân vọng — thư mới tìm đường”.</em> Sau khi nhặt đủ, hãy chạm các dấu theo thứ tự.</p><div class="rune-clue">${found.size===3?'Ba tín vật đã hiện đủ. Hãy nhập thứ tự.':'Nhặt đủ 3 vật phẩm trên bức tranh.'}</div><div class="rune-buttons">${relics.map(it=>`<button class="rune-btn artifact-choice" data-rune="${it.symbol}" ${found.size<3?'disabled':''}>${artifactMarkup(it.kind,it.name,true)}<span>${it.name}</span></button>`).join('')}</div><div class="rune-input" id="runeInput">${runeSequence.join('  ')||'○ ○ ○'}</div><button class="ghost-btn" id="clearRunes">Xóa dấu</button>`;$$('[data-rune]').forEach(b=>b.onclick=()=>{if(runeSequence.length===3)return;runeSequence.push(b.dataset.rune);tone(490+runeSequence.length*110,.07);$('#runeInput').textContent=runeSequence.join('  ');if(runeSequence.length===3){if(runeSequence.join(',')===runeOrder.join(',')){toast('Ấn ký đã mở.');setTimeout(advanceHistory,750)}else{toast('Dấu ấn chưa đúng trật tự.');setTimeout(()=>{runeSequence=[];if($('#runeInput'))$('#runeInput').textContent='○ ○ ○'},800)}}});$('#clearRunes').onclick=()=>{runeSequence=[];$('#runeInput').textContent='○ ○ ○'};}
function renderSlide(){const mount=$('#puzzleMount');const blank=slideArr.indexOf(8);mount.innerHTML=`<h4>✦ Khôi phục mật thư</h4><div class="tile-grid" id="tileGrid"></div><div class="tile-hint">Lượt di chuyển: <b id="moveNumber">${slideMoves}</b><br>Chỉ ô viền sáng sát ô trống mới trượt được.</div><p><button class="ghost-btn" id="referenceArt">Xem tranh gốc ◈</button> <button class="ghost-btn" id="slideReset">Xáo lại</button></p>`;const g=$('#tileGrid');slideArr.forEach((v,i)=>{const b=document.createElement('button');const movable=Math.abs(Math.floor(blank/3)-Math.floor(i/3))+Math.abs((blank%3)-(i%3))===1;b.className='puzzle-tile'+(v===8?' blank':'')+(movable&&v!==8?' movable':'');b.setAttribute('aria-label',v===8?'Ô trống':'Mảnh '+(v+1));if(v!==8){b.style.backgroundPosition=`${(v%3)*50}% ${Math.floor(v/3)*50}%`;if(movable)b.onclick=()=>{[slideArr[i],slideArr[blank]]=[slideArr[blank],slideArr[i]];slideMoves++;tone(400,.08);if(slideArr.every((n,j)=>n===j)){toast(`Đã ghép bức tranh sau ${slideMoves} lượt!`);setTimeout(advanceHistory,750)}else renderSlide()}}g.appendChild(b)});$('#referenceArt').onclick=()=>openCodex('Bức tranh hoàn chỉnh','Hãy quan sát các đường nét trong tranh trước khi trở lại sắp xếp ô. Đây là tranh minh họa phong cách cổ, không phải một “mật thư” khảo cổ.',[1],'<img src="assets/temple.webp" alt="Tranh gốc cho trò ghép hình" style="width:100%;border:4px solid #a47c48">');$('#slideReset').onclick=()=>{shuffleSlide();renderSlide()};}
function pipeDirs(i){return basePipe[i].map(d=>rotateDir(d,pipeState[i]))}
function pipeConnected(a,b){const diff=b-a;let d;if(diff===-3)d=0;else if(diff===1&&Math.floor(a/3)===Math.floor(b/3))d=1;else if(diff===3)d=2;else if(diff===-1&&Math.floor(a/3)===Math.floor(b/3))d=3;else return false;return pipeDirs(a).includes(DIR[d])&&pipeDirs(b).includes(DIR[opposite[d]])}
function checkPipe(){if(!pipeDirs(0).includes('W')||!pipeDirs(8).includes('E'))return false;const seen=new Set([0]),q=[0];while(q.length){const a=q.shift();if(a===8)return true;for(const b of [a-3,a+1,a+3,a-1])if(b>=0&&b<9&&!seen.has(b)&&pipeConnected(a,b)){seen.add(b);q.push(b)}}return false}
function renderPipes(){if(!window.BTKMarch){throw new Error('Missing march.js');}window.BTKMarch.mount('#puzzleMount');}
function renderVictory(){$('#puzzleMount').innerHTML=`<div class="victory"><div class="sigil">✺</div><h3 class="serif">VẠN XUÂN</h3><p>Năm 544, Lý Bí xưng đế, lấy niên hiệu <strong>Thiên Đức</strong> và đặt tên nước là <strong>Vạn Xuân</strong>. Hành trình giải đố khép lại ở một cột mốc lịch sử được ghi nhận.</p><button class="action-btn" id="finalScroll">Mở cuộn sớ lịch sử</button><p><button class="ghost-btn" id="toCake">Tiếp tục: làm Bánh Bác ❀</button></p></div>`;$('#finalScroll').onclick=()=>openCodex(HIST[3].title,HIST[3].lore,HIST[3].refs,'<p><strong>Sự kiện xác thực:</strong> Lý Bí dựng nước Vạn Xuân năm 544. Đây là dấu mốc lịch sử; cảnh họa và lời thoại trong game là minh họa sáng tạo.</p>');$('#toCake').onclick=()=>{resetCake();showView('cake')};}
$('#hintBtn').onclick=()=>{const hints=['Tín vật không còn hiện như nút bấm lớn nữa. Hãy nhìn kỹ vùng gốc cây, tán cây và mép đá gần bờ nước. Trong 4 giây, ánh glint sẽ lộ nhẹ vị trí của chúng.','Bạn chỉ di chuyển ô sát ô trống. Xem tranh gốc và đưa các góc về đúng vị trí trước.','Hãy quan sát hai cổng bản đồ. Khi chưa xuất quân, bạn có thể xoay không giới hạn; sau khi xuất quân, không thể chỉnh các ô quân đã đi qua.','Nhấn mở cuộn sớ cuối để đọc nguồn lịch sử.'];if(historyStage===0){setHistoryHintGlow(true);clearTimeout(hintRevealTimer);hintRevealTimer=setTimeout(()=>setHistoryHintGlow(false),4200)}toast(hints[historyStage])};
function openCodex(title,body,ids=[0],extra=''){const modal=$('#codexModal');$('#codexTitle').textContent=title;$('#codexText').innerHTML=`<p>${body}</p>${extra}<p><em>Tranh, vật phẩm, hành động và lời thoại được hư cấu cho trải nghiệm; không phải chứng cứ lịch sử.</em></p>`;$('#codexLinks').innerHTML=ids.map(i=>`<a href="${SOURCES[i].href}" target="_blank" rel="noopener">↗ ${SOURCES[i].label}</a>`).join('');modal.classList.add('open');modal.setAttribute('aria-hidden','false');$('#codexTitle').focus?.();}
function closeCodex(){const m=$('#codexModal');m.classList.remove('open');m.setAttribute('aria-hidden','true')}
$('#openCodex').onclick=()=>{const s=HIST[historyStage];openCodex(s.title,s.lore,s.refs)};
$$('[data-close]').forEach(el=>el.onclick=closeCodex);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCodex()});

// -----------------------------------------------------------------------------
// GIAN BẾP V4 – actual drag-and-drop picture interaction and royal judgement.
// This is an educational game inspired by the LOCAL LEGEND, not verified history.
// -----------------------------------------------------------------------------
const INGREDIENTS=[
 {id:'nep',name:'Gạo nếp',img:'assets/ingredients/nep.png',good:true},
 {id:'gac',name:'Gấc nếp',img:'assets/ingredients/gac.png',good:true},
 {id:'dau',name:'Đậu xanh',img:'assets/ingredients/dau.png',good:true},
 {id:'vung',name:'Vừng',img:'assets/ingredients/vung.png',good:true},
 {id:'duong',name:'Đường kính',img:'assets/ingredients/duong.png',good:true},
 {id:'mo',name:'Mỡ lợn',img:'assets/ingredients/mo.png',good:true},
 {id:'phomai',name:'Phô mai',img:'assets/ingredients/phomai.png',good:false},
 {id:'botmi',name:'Bột mì',img:'assets/ingredients/botmi.png',good:false},
 {id:'cacao',name:'Ca cao',img:'assets/ingredients/cacao.png',good:false},
 {id:'dua',name:'Dừa nạo',img:'assets/ingredients/dua.png',good:false}
];
const LAYER_ASSETS=[
 {id:'ĐỎ',name:'Lớp gấc đỏ',img:'assets/layers/red.png'},
 {id:'TRẮNG',name:'Lớp nếp trắng',img:'assets/layers/white.png'},
 {id:'ĐẬU',name:'Nhân đậu xanh',img:'assets/layers/bean.png'}
];
let cakeStep=0, cakeBag=[], cakeLayers=[null,null,null], chosenLayer=null;
let heat=54,skillProgress=0,scorches=0,heatMistakes=0,holding=false,cookTimer=null;
let rollStrokes=0,rollMistakes=0,rollDrag=null,ceremonyActive=false,verdict=null;
let dragGhost=null, cakeLocked=false, resultDetails=[];
const sfxCache={};
function foley(name){if(!audioOn)return;try{const audio=(sfxCache[name]||new Audio(`assets/sfx/${name}.wav`)).cloneNode();audio.volume=name==='gong'?.58:.4;audio.play().catch(()=>{});}catch(e){}}
function cleanupGhost(){if(dragGhost){dragGhost.remove();dragGhost=null;}$$('.drop-basket.is-over,.layer-target.is-over,.royal-target.is-over').forEach(x=>x.classList.remove('is-over'));}
function stopCook(){holding=false;clearInterval(cookTimer);cookTimer=null;}
function cakeMessage(msg,kind=''){const t=$('#cakeFeedback');t.textContent=msg;t.dataset.kind=kind;}
function resetCake(){stopCook();cleanupGhost();cakeStep=0;cakeBag=[];cakeLayers=[null,null,null];chosenLayer=null;heat=54;skillProgress=0;scorches=0;heatMistakes=0;rollStrokes=0;rollMistakes=0;rollDrag=null;ceremonyActive=false;verdict=null;cakeLocked=false;resultDetails=[];renderCake();}
$('#cakeRestart').onclick=()=>{if(confirm('Bắt đầu lại hành trình làm bánh và dâng vua?'))resetCake()};
$('#cakeHintBtn').onclick=()=>{
 const tips=[
  'Báo Quân đội nhân dân (2025) ghi nhận 6 nguyên liệu: gạo nếp, gấc, đỗ xanh, mỡ lợn, đường kính và vừng. Kéo ảnh vào giỏ. Đây là game, không phải toàn bộ định lượng công thức.',
  'Chờ kim ở vùng vàng-xanh rồi nhấn giữ BÁC BỘT. Nếu kim quá cao hoặc quá thấp, chỉnh lửa trước khi tiếp tục.',
  'Theo lời thợ bánh: vừng phủ ngoài, lớp đỏ bên ngoài lớp trắng, nhân đậu xanh ở giữa. Hãy đặt hình vào khay theo thứ tự từ ngoài vào trong.',
  'Vuốt trên dải bột từ trái qua phải ba lần. Vuốt quá nhanh hoặc lệch đường làm bánh mất độ chắc tay.',
  'Lúc dâng vua, những gì bạn đã làm mới quyết định kết quả. Cảnh vua chấm bánh là hư cấu dựa trên truyền thuyết.'
 ];cakeMessage(tips[Math.min(cakeStep,4)],'hint');
};
function cakeSkin(step){
 const art=$('.cake-art');art.dataset.cakeStage=String(step);
 const bg=art.querySelector(':scope > img');
 bg.src=step===0?'assets/kitchen.webp':step<=3?'assets/bep.webp':'assets/royal-court.webp';
 bg.alt=step>=4?'Minh họa điện vua tưởng tượng, không phải phục dựng lịch sử':'Minh họa gian bếp và thao tác làm Bánh Bác';
 const artCake=$('#cakeIllustration');
 artCake.style.opacity=step===0?'.25':step===1?'.48':step===2?'.9':step===3?'.95':'0';
 let fire=$('#gameFire');if(!fire){fire=document.createElement('div');fire.id='gameFire';fire.className='game-fire';art.appendChild(fire)}
 fire.style.display=step===1?'block':'none';
}
function cakeProgress(){const prog=$('#cakeProgress');if(prog.children.length!==5)prog.innerHTML='<span></span>'.repeat(5);[...prog.children].forEach((el,i)=>el.classList.toggle('active',i<=Math.min(cakeStep,4)));
 $('#cakeChapter').textContent=cakeStep<4?`GIAN BẾP • CHẶNG ${cakeStep+1}/5`:cakeStep===4?'NGỰ THIỆN • CHẶNG 5/5':'NGỰ THIỆN • LỜI PHÁN';
}
// A Pointer Events drag helper: the artwork follows mouse OR finger, not text.
function dragPicture(e,imgSrc,opts={}){
 if(e.button!==undefined&&e.button!==0)return;
 if(dragGhost)return;
 e.preventDefault();
 const startX=e.clientX,startY=e.clientY;
 let moved=false;
 const ghost=document.createElement('div');ghost.className='picture-ghost';
 const img=document.createElement('img');img.src=imgSrc;img.alt='';img.draggable=false;ghost.appendChild(img);document.body.appendChild(ghost);dragGhost=ghost;
 function position(x,y){ghost.style.left=x+'px';ghost.style.top=y+'px'}position(startX,startY);
 foley('pickup');
 function move(p){if(p.pointerId!==e.pointerId)return;p.preventDefault();position(p.clientX,p.clientY);if(Math.hypot(p.clientX-startX,p.clientY-startY)>9)moved=true;if(p.clientY<62)window.scrollBy(0,-17);else if(p.clientY>window.innerHeight-62)window.scrollBy(0,17);
  const target=opts.findTarget?.(p.clientX,p.clientY);$$('.drop-basket,.layer-target,.royal-target').forEach(x=>x.classList.toggle('is-over',x===target));
 }
 function off(){document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',cancel);cleanupGhost()}
 function up(p){if(p.pointerId!==e.pointerId)return;const target=opts.findTarget?.(p.clientX,p.clientY);off();if(target||(!moved&&opts.tapFallback)){opts.onDrop?.(target||null);foley('drop')}else{foley('click');cakeMessage('Hãy kéo hình và thả vào đúng giỏ / vị trí có viền sáng.')}}
 function cancel(p){if(p.pointerId!==e.pointerId)return;off()}
 document.addEventListener('pointermove',move,{passive:false});document.addEventListener('pointerup',up);document.addEventListener('pointercancel',cancel);
}
function hitRect(el,x,y){if(!el)return false;const r=el.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom}
function addBag(id){if(cakeBag.includes(id))return;if(cakeBag.length>=6){cakeMessage('Giỏ chỉ chứa 6 phần nguyên liệu. Chạm một món trong giỏ để lấy ra.');foley('fail');return}cakeBag.push(id);renderIngredients();cakeMessage(`Đã xếp ${cakeBag.length}/6 phần vào giỏ. Hãy tự cân nhắc thành phần trước khi mang bánh đi dâng.`, 'ok');}
function renderIngredients(){
 const cards=$('#ingredientPictures');if(!cards)return;cards.innerHTML='';
 INGREDIENTS.forEach(ing=>{const b=document.createElement('button');b.className='ingredient-picture'+(cakeBag.includes(ing.id)?' packed':'');b.type='button';b.disabled=cakeBag.includes(ing.id);
  b.innerHTML=`<span class="ingredient-image"><img src="${ing.img}" alt="Bát ${ing.name}" draggable="false"></span><span class="ingredient-name">${ing.name}</span><span class="ingredient-mark">${cakeBag.includes(ing.id)?'✓ Đã vào giỏ':'Kéo ảnh ↗'}</span>`;
  b.addEventListener('pointerdown',e=>dragPicture(e,ing.img,{findTarget:(x,y)=>hitRect($('#dropBasket'),x,y)?$('#dropBasket'):null,onDrop:()=>addBag(ing.id),tapFallback:true}));b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();addBag(ing.id)}});
  cards.appendChild(b);
 });
 const slot=$('#basketContents');if(!slot)return;slot.innerHTML='';
 for(let i=0;i<6;i++){
  const ing=INGREDIENTS.find(g=>g.id===cakeBag[i]);const b=document.createElement('button');b.type='button';b.className='basket-slot'+(ing?' filled':'');b.title=ing?`Bỏ ${ing.name} ra khỏi giỏ`:'Ô trống';
  b.innerHTML=ing?`<img src="${ing.img}" alt="${ing.name}"><span>${ing.name}</span><b class="basket-x">×</b>`:'<span class="basket-placeholder">+</span>';
  if(ing)b.onclick=()=>{cakeBag=cakeBag.filter(v=>v!==ing.id);foley('click');renderIngredients();cakeMessage(`Đã bỏ ${ing.name} khỏi giỏ.`)};
  slot.appendChild(b);
 }
 $('#basketAmount').textContent=cakeBag.length+'/6';
 $('#ingProceed').disabled=cakeBag.length!==6;
}
function renderCake(){
 stopCook();cleanupGhost();cakeProgress();cakeSkin(cakeStep);cakeMessage('');
 const mount=$('#cakePuzzle');
 if(cakeStep===0){
  $('#cakeStepTitle').textContent='01 • Xếp ảnh nguyên liệu vào giỏ';$('#cakeWorkLabel').textContent='GIỎ NGỰ THIỆN';
  $('#cakeNarrative p').textContent='Kéo từng hình nguyên liệu vào giỏ bằng chuột hoặc ngón tay. Giỏ chứa đúng sáu phần; sai một thành phần, bánh sẽ không đạt khi dâng vua.';
  mount.innerHTML=`<p class="game-lead">KÉO <strong>HÌNH BÁT NGUYÊN LIỆU</strong> VÀO GIỎ. Không kéo chữ. Có thể chạm để chọn trên thiết bị hỗ trợ trợ năng.</p><div class="drop-basket" id="dropBasket"><div class="basket-heading"><span>🧺 Giỏ nguyên liệu</span><b id="basketAmount">0/6</b></div><div class="basket-contents" id="basketContents"></div><div class="basket-guidance">Thả vào đây • Chạm món đã chọn để lấy ra</div></div><div class="ingredient-images" id="ingredientPictures"></div><button class="action-btn recipe-next" id="ingProceed" disabled>Mang giỏ tới gian bếp →</button><p class="mini-disclaimer">Các hình bát nguyên liệu là tranh minh họa tạo cho game. Lựa chọn không biểu thị định lượng thực tế.</p>`;
  renderIngredients();
  $('#ingProceed').onclick=()=>{foley('gong');cakeStep=1;renderCake()};
 } else if(cakeStep===1){renderHeat();}
 else if(cakeStep===2){renderLayerStage();}
 else if(cakeStep===3){renderRollStage();}
 else if(cakeStep===4){renderRoyalStage();}
 else{renderJudgement();}
}
function renderHeat(){
 $('#cakeStepTitle').textContent='02 • Giữ lửa – bác bột';$('#cakeWorkLabel').textContent='LỬA & BỘT';
 $('#cakeNarrative p').textContent='Kỹ thuật bác bột trên chảo mỡ nóng đòi hỏi kinh nghiệm của người thợ. Bạn đang chơi mô phỏng điều chỉnh nhiệt, tuyệt đối không thử bằng tay trên chảo nóng.';
 const m=$('#cakePuzzle');m.innerHTML=`<p>Điều chỉnh kim về vùng xanh <b>42–68</b>. Nhấn giữ để “bác bột”. Nhiệt giảm dần. Mỗi lần giữ sai nhiệt làm giảm chất lượng bánh.</p><div class="heat-meter"><div id="heatMarker" class="heat-marker"></div></div><div class="heat-controls"><button class="ghost-btn" id="decreaseHeat">− Hạ lửa</button><strong id="heatValue">54</strong><button class="ghost-btn" id="increaseHeat">+ Thêm lửa</button></div><div class="cook-row"><button class="hold-btn" id="holdBake">GIỮ ĐỂ<br>BÁC BỘT</button><div class="cook-readout"><strong>Độ hoàn thiện: <span id="skillValue">0</span>%</strong><div class="skill-progress"><span id="skillFill"></span></div><p>Nhiệt lỗi: <span id="scorchValue">0</span>/3</p></div></div><div class="mini-disclaimer">Lửa và kim nhiệt chỉ là thông số game. Công thức thực tế xem nguồn Quân đội nhân dân (2025).</div>`;
 $('#increaseHeat').onclick=()=>{heat=Math.min(100,heat+9);updateHeatUI();foley('click')};
 $('#decreaseHeat').onclick=()=>{heat=Math.max(0,heat-9);updateHeatUI();foley('click')};
 const btn=$('#holdBake');const holdStart=e=>{e.preventDefault();holding=true;btn.setPointerCapture?.(e.pointerId);foley('fire')};
 btn.addEventListener('pointerdown',holdStart);
 ['pointerup','pointercancel','lostpointercapture','pointerleave'].forEach(ev=>btn.addEventListener(ev,()=>{holding=false}));
 updateHeatUI();let badCounter=0;
 cookTimer=setInterval(()=>{
  heat=Math.max(0,heat-.23);
  if(holding){
   if(heat>=42&&heat<=68){skillProgress=Math.min(100,skillProgress+1.15);badCounter=0}
   else {badCounter++;if(badCounter>=8){scorches++;heatMistakes++;badCounter=0;holding=false;cakeMessage('Nhiệt vượt ngưỡng. Bột đang kém dẻo, hãy chỉnh lửa!', 'warn');foley('fail')}}
  }
  updateHeatUI();
  if(scorches>=3){stopCook();cakeMessage('Mẻ bột đã hỏng do giữ nhiệt sai nhiều lần. Hãy mang chiếc bánh lỗi đi dâng để xem phán quyết.','warn');cakeLocked=true;setTimeout(()=>{cakeStep=4;renderCake()},1200)}
  else if(skillProgress>=100){stopCook();foley('pickup');cakeStep=2;setTimeout(()=>renderCake(),530)}
 },90);
}
function updateHeatUI(){if(!$('#heatMarker'))return;$('#heatMarker').style.left=heat+'%';$('#heatValue').textContent=Math.round(heat)+'°';$('#skillValue').textContent=Math.round(skillProgress);$('#skillFill').style.width=skillProgress+'%';$('#scorchValue').textContent=scorches;
 const f=$('#gameFire');if(f)f.style.setProperty('--fire-intensity',String(.3+heat/100*.7));
}
function renderLayerStage(){
 $('#cakeStepTitle').textContent='03 • Kéo từng lớp bánh';$('#cakeWorkLabel').textContent='XẾP LỚP';
 $('#cakeNarrative p').textContent='Theo lời người thợ, cuộn bánh theo nguyên tắc đỏ trước, trắng sau, nhân đậu xanh ở giữa, vừng bên ngoài. Hãy kéo hình từng lớp vào khay từ ngoài tới trong.';
 $('#cakePuzzle').innerHTML=`<p>Kéo <strong>HÌNH LỚP BÁNH</strong> vào 3 vị trí. Bạn có thể thay đổi lựa chọn trước khi cuộn.</p><div class="layer-picture-row" id="layerPictures"></div><div id="layerSlots" class="layer-picture-slots"></div><button id="submitLayers" class="action-btn">Xác nhận và bắt đầu cuộn →</button><button id="clearLayers" class="ghost-btn">Xếp lại</button><p class="mini-disclaimer">Thứ tự cuộn được đơn giản hóa để chơi; không thay thế kỹ thuật làm bánh thực tế.</p>`;
 drawLayerPics();
 $('#submitLayers').onclick=()=>{if(cakeLayers.some(x=>x===null)){cakeMessage('Bạn chưa xếp đủ ba lớp.');return}foley('roll');cakeStep=3;renderCake()};
 $('#clearLayers').onclick=()=>{cakeLayers=[null,null,null];chosenLayer=null;drawLayerPics()};
}
function dropLayer(id,slot){if(slot===null){chosenLayer=id;drawLayerPics();cakeMessage('Đã cầm một lớp bánh. Chạm vào vị trí để đặt, hoặc kéo ảnh vào khay.');return}
 cakeLayers=cakeLayers.map((v,i)=>(v===id?null:v));cakeLayers[slot]=id;chosenLayer=null;foley('drop');drawLayerPics();cakeMessage('Đã xếp một lớp. Bạn có thể thay đổi vị trí nếu cần.');}
function drawLayerPics(){const src=$('#layerPictures'),dest=$('#layerSlots');if(!src||!dest)return;src.innerHTML='';
 LAYER_ASSETS.forEach(l=>{const b=document.createElement('button');b.className='layer-picture'+(chosenLayer===l.id?' selected':'');b.disabled=cakeLayers.includes(l.id);b.innerHTML=`<img src="${l.img}" alt="${l.name}" draggable="false"><span>${l.name}</span>`;
  b.addEventListener('pointerdown',e=>dragPicture(e,l.img,{findTarget:(x,y)=>$$('.layer-target').find(t=>hitRect(t,x,y)),tapFallback:true,onDrop:t=>dropLayer(l.id,t?Number(t.dataset.slot):null)}));b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();dropLayer(l.id,null)}});
  src.appendChild(b);
 });
 dest.innerHTML='';
 for(let i=0;i<3;i++){
  const l=LAYER_ASSETS.find(x=>x.id===cakeLayers[i]);const b=document.createElement('button');b.className='layer-target'+(l?' filled':'');b.dataset.slot=i;
  b.innerHTML=`<span class="layer-num">0${i+1}</span>${l?`<img src="${l.img}" alt="${l.name}"><span>${l.name}</span>`:`<span class="layer-empty">${['Lớp ngoài (đỏ)','Lớp giữa (trắng)','Nhân bên trong'][i]} · thả ảnh vào đây</span>`}`;
  b.onclick=()=>{if(chosenLayer)dropLayer(chosenLayer,i);else if(l){cakeLayers[i]=null;drawLayerPics()}};
  dest.appendChild(b);
 }
}
function renderRollStage(){
 $('#cakeStepTitle').textContent='04 • Cuộn chiếc bánh';$('#cakeWorkLabel').textContent='CUỘN BÁNH';
 $('#cakeNarrative p').textContent='Người làm bánh cuộn các lớp cho đều và chắc tay. Trong game, bạn phải vuốt theo đúng hướng ba lần để hoàn thiện trước khi dâng vua.';
 $('#cakePuzzle').innerHTML=`<p>Đặt ngón tay hoặc chuột lên dải bột rồi <strong>VUỐT TỪ TRÁI SANG PHẢI</strong>. Cần 3 đường vuốt đủ dài và đều.</p><div class="roll-arena" id="rollArena"><div class="roll-guide"><span>KHỞI ĐẦU ◉</span><span>→ → →</span><span>ĐÍCH ✦</span></div><div class="roll-dough" id="rollDough"><img src="assets/layers/red.png" alt="Dải bột bánh cuộn" draggable="false"></div><div class="roll-track"><div id="rollBar"></div></div></div><div class="roll-status">Số lượt vuốt chuẩn: <b id="rollCount">0/3</b> <span id="rollWarning"></span></div><div class="mini-disclaimer">Động tác kéo trên màn hình là game, không mô phỏng chính xác lực cuộn ngoài đời.</div>`;
 const arena=$('#rollArena');
 arena.addEventListener('pointerdown',e=>{if(e.button!==undefined&&e.button!==0)return;e.preventDefault();arena.setPointerCapture?.(e.pointerId);const rect=arena.getBoundingClientRect();rollDrag={x:e.clientX,y:e.clientY,t:performance.now()};foley('roll');});
 arena.addEventListener('pointermove',e=>{if(!rollDrag)return;e.preventDefault();const dx=Math.max(0,e.clientX-rollDrag.x);arena.style.setProperty('--roll-offset',Math.min(85,dx/4)+'px');});
 const finish=e=>{if(!rollDrag)return;e.preventDefault();const dx=e.clientX-rollDrag.x,dy=Math.abs(e.clientY-rollDrag.y),duration=performance.now()-rollDrag.t;rollDrag=null;arena.style.setProperty('--roll-offset','0px');
  if(dx>=Math.min(100,arena.getBoundingClientRect().width*.3)&&dy<90&&duration>=125){rollStrokes++;foley('pickup');cakeMessage(`Vuốt thành công ${rollStrokes}/3!`,'ok')}
  else{rollMistakes++;foley('fail');cakeMessage('Cuộn chưa đều! Hãy vuốt dài hơn từ trái sang phải, chậm và thẳng tay.','warn')}
  $('#rollCount').textContent=rollStrokes+'/3';$('#rollBar').style.width=Math.min(100,rollStrokes/3*100)+'%';
  if(rollStrokes>=3){foley('gong');cakeStep=4;setTimeout(renderCake,650)}
 };
 arena.addEventListener('pointerup',finish);arena.addEventListener('pointercancel',()=>{rollDrag=null;arena.style.setProperty('--roll-offset','0px')});
}
function evaluateCake(){
 resultDetails=[];
 const goodIngredients=cakeBag.length===6&&INGREDIENTS.filter(x=>x.good).every(x=>cakeBag.includes(x.id));
 const correctLayers=cakeLayers.join('|')==='ĐỎ|TRẮNG|ĐẬU';
 const cooked=skillProgress>=99&&scorches<3;
 const rolled=rollStrokes===3&&rollMistakes<=2;
 if(!goodIngredients)resultDetails.push('Nguyên liệu trong giỏ chưa đúng với nguyên liệu truyền thống.');
 if(!cooked)resultDetails.push('Bột không đạt vì điều khiển nhiệt chưa tốt.');
 if(!correctLayers)resultDetails.push('Thứ tự cuộn lớp đỏ – trắng – nhân đậu xanh chưa đúng.');
 if(!rolled)resultDetails.push('Thao tác cuộn chưa chắc và đều.');
 return goodIngredients&&cooked&&correctLayers&&rolled;
}
function renderRoyalStage(){
 $('#cakeStepTitle').textContent='ĐEM BÁNH VÀO NGỰ ĐIỆN';$('#cakeWorkLabel').textContent='NGỰ ĐIỆN VẠN XUÂN · HƯ CẤU';
 $('#cakeNarrative p').textContent='Trong lời kể dân gian, Bánh Bác gắn với câu chuyện dâng vua Lý Nam Đế. Màn vua nếm và đưa ra phán quyết này là một tình huống sáng tạo, KHÔNG phải sự kiện lịch sử đã được xác minh.';
 $('#cakePuzzle').innerHTML=`<div class="royal-board" id="royalBoard"><div class="royal-flags" aria-hidden="true">✦　✦　✦</div><div class="king-frame"><img src="assets/lybi-face.webp" alt="Chân dung minh họa Lý Nam Đế do game sáng tạo"><span class="king-caption">LÝ NAM ĐẾ · MINH HỌA</span></div><div class="royal-message">“Ngươi đã đem đến thức bánh gì của làng Giang Xá?”<small>Lời thoại tưởng tượng trong game</small></div><div id="royalTarget" class="royal-target">✦ NGỰ ÁN · THẢ BÁNH VÀO ĐÂY ✦</div><div class="royal-offer" id="royalOffer"><img src="assets/products.png" alt="Kéo hình đĩa Bánh Bác vào ngự án" draggable="false"><small>GIỮ HÌNH BÁNH VÀ KÉO LÊN NGỰ ÁN</small></div><button class="action-btn court-submit" id="presentCake">✦ Dâng bánh bằng nút (nếu khó kéo) ✦</button></div><p class="mini-disclaimer">Vua khen hoặc chê tùy kết quả chơi. Cảnh nếm bánh, lời vua nói và ngự điện đều hư cấu trên nền truyền thuyết địa phương.</p>`;
 function offerToKing(){if(ceremonyActive)return;ceremonyActive=true;$('#presentCake').disabled=true;$('#presentCake').textContent='Vua đang nếm bánh...';$('#royalTarget').textContent='ĐÃ NHẬN BÁNH · VUA ĐANG NẾM...';foley('gong');$('#royalBoard').classList.add('offering');
  setTimeout(()=>{verdict=evaluateCake();foley(verdict?'gong':'fail');cakeStep=5;ceremonyActive=false;renderCake()},2150);
 }
 $('#presentCake').onclick=offerToKing;
 $('#royalOffer').addEventListener('pointerdown',e=>dragPicture(e,'assets/products.png',{findTarget:(x,y)=>hitRect($('#royalTarget'),x,y)?$('#royalTarget'):null,onDrop:offerToKing,tapFallback:false}));
}
function renderJudgement(){
 const good=!!verdict;$('#cakeStepTitle').textContent=good?'VUA KHEN • CHÚC MỪNG!':'VUA CHÊ • BÁNH CHƯA ĐẠT';$('#cakeWorkLabel').textContent=good?'THẮNG · NGỰ THIỆN ĐẠT':'THUA · CẦN LÀM LẠI';
 $('#cakeNarrative p').textContent='Đây là kết thúc tưởng tượng của trò chơi, lấy cảm hứng từ câu chuyện dân gian Bánh Bác dâng Lý Nam Đế tại Giang Xá.';
 $('#cakePuzzle').innerHTML=`<div class="royal-verdict ${good?'good':'bad'}"><div class="verdict-shine"></div><div class="verdict-icon">${good?'✦':'✕'}</div><div class="verdict-king"><img src="assets/lybi-face.webp" alt="Tranh minh họa vua Lý Nam Đế"></div><span class="verdict-kicker">${good?'NGỰ PHÊ: ĐẠT':'NGỰ PHÊ: CHƯA ĐẠT'}</span><h3 class="serif">${good?'VUA KHEN — BẠN ĐÃ THẮNG!':'VUA CHÊ — BẠN ĐÃ THUA!'}</h3><p class="verdict-speech">${good?'“Bánh có sắc gấc đẹp, nếp dẻo, nhân đậu bùi. Tấm lòng và tay nghề đều đáng quý!”':'“Bánh này chưa đúng vị, chưa trọn kỹ thuật. Hãy trở về gian bếp và luyện thêm!”'}</p><small>Câu nói trên do trò chơi sáng tác; không phải sử liệu.</small>${good?'<div class="royal-ribbon">✿ DANH HIỆU: NGƯỜI GIỮ VỊ XƯA ✿</div>':`<div class="loss-reasons">${resultDetails.map(d=>`<div>⚠ ${d}</div>`).join('')}</div>`}<div class="victory-actions"><button class="action-btn" id="retryCake">↻ ${good?'Chơi thêm lần nữa':'Thử làm bánh lại'}</button><button class="ghost-btn" id="royalSource">▤ Đọc nguồn truyền thuyết</button><button class="ghost-btn" id="royalHistory">◈ Theo bước Lý Nam Đế</button></div></div>`;
 const board=$('.royal-verdict');if(good){for(let i=0;i<18;i++){const c=document.createElement('i');c.className='confetti';c.style.left=(5+Math.random()*90)+'%';c.style.animationDelay=(Math.random()*1)+'s';c.style.background=['#f9d48d','#c66c55','#d7b05b','#a5b479'][i%4];board.appendChild(c)}}
 $('#retryCake').onclick=resetCake;
 $('#royalSource').onclick=()=>openCodex('Chuyện bánh dâng vua – truyền thuyết Giang Xá','Báo Quân đội nhân dân (2025) ghi lời thợ làm bánh Nguyễn Thị Điều kể rằng bánh xưa được làm để bày tỏ lòng biết ơn vua Lý Nam Đế. Không có cơ sở chứng minh vua trực tiếp nếm hay khen/chê đúng như tình huống game. Công đoạn bác bột, nguyên liệu và nguyên tắc đỏ–trắng–nhân đậu được mô tả trong phóng sự.',[3]);
 $('#royalHistory').onclick=()=>{historyStage=0;reinitializePuzzles();renderHistory();showView('history')};
}
resetCake();
