(() => {
 'use strict';
 const cfg=window.BODA;
 document.body.classList.add('js-ready');
 document.querySelector('main').setAttribute('inert','');
 const $=s=>document.querySelector(s);
 const root=document.documentElement;
 const icons={play:'<svg viewBox="0 0 24 24" class="play" aria-hidden="true"><path d="m9 5 10 7-10 7Z"/></svg>',pause:'<svg viewBox="0 0 24 24" class="pause" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>'};
 document.body.insertAdjacentHTML('beforeend',`
 <button class="audio-toggle" aria-label="Reproducir música" aria-pressed="false" title="Música de la invitación">${icons.play}${icons.pause}</button>
 <div class="toast" role="status" aria-live="polite"></div>
 <dialog id="rsvp" aria-labelledby="rsvp-title" aria-describedby="rsvp-description">
  <button class="close" aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
  <h2 id="rsvp-title">Tu confirmación</h2><p id="rsvp-description">Contanos quiénes vienen para tenerlos en cuenta.</p>
  <form id="rsvp-form" novalidate>
   <label for="guest">Tu nombre y apellido</label><input id="guest" name="guest" autocomplete="section-guest name" required maxlength="100" aria-describedby="guest-error"><p class="form-error" id="guest-error" hidden></p>
   <fieldset class="rsvp-attendance" aria-describedby="attendance-error"><legend>Cómo vas a asistir</legend>
    <label class="rsvp-option"><input type="radio" name="attendance" value="solo" required><span>Voy solo/a</span></label>
    <label class="rsvp-option"><input type="radio" name="attendance" value="acompanado" required aria-controls="companion-fields"><span>Voy con mi pareja o acompañante</span></label>
    <label class="rsvp-option"><input type="radio" name="attendance" value="no" required><span>No voy a poder asistir</span></label>
    <p class="form-error" id="attendance-error" hidden></p>
   </fieldset>
   <div id="companion-fields" hidden><label for="companion">Nombre y apellido de tu pareja o acompañante</label><input id="companion" name="companion" autocomplete="section-companion name" maxlength="100" aria-describedby="companion-error" disabled><p class="form-error" id="companion-error" hidden></p></div>
   <details class="rsvp-preview"><summary>Revisar mensaje para Tati y Mau</summary><textarea id="message" aria-label="Mensaje para Tati y Mau" readonly placeholder="Elegí tu respuesta para ver el mensaje que vas a enviar."></textarea></details>
   <p class="field-note" id="rsvp-note"></p><button class="btn" type="submit" id="rsvp-submit"></button>
  </form>
 </dialog>
 <dialog id="dress" aria-labelledby="dress-title"><button class="close" aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><h2 id="dress-title">Tenida cocktail</h2><p class="dress-intro">Un toque arreglado, sin tanta formalidad.</p><div class="looks-grid"><figure class="look"><div class="look-art"><img src="assets/look-vestido-relajado.webp" alt="Vestido midi oliva de lino y sandalias bajas." width="610" height="597" loading="lazy" decoding="async"></div><figcaption><h3>Vestido liviano</h3><p>Telas frescas y sandalias cómodas.</p></figcaption></figure><figure class="look"><div class="look-art"><img src="assets/look-conjunto-relajado.webp" alt="Blusa rosa, pantalón amplio de lino y ballerinas." width="584" height="587" loading="lazy" decoding="async"></div><figcaption><h3>Blusa y pantalón</h3><p>Un conjunto suave, con zapatos bajos.</p></figcaption></figure><figure class="look"><div class="look-art"><img src="assets/look-camisa-relajado.webp" alt="Camisa celeste de lino, pantalón chino beige y mocasines." width="623" height="657" loading="lazy" decoding="async"></div><figcaption><h3>Camisa y chinos</h3><p>Mangas arremangadas y mocasines.</p></figcaption></figure><figure class="look"><div class="look-art"><img src="assets/look-polo-relajado.webp" alt="Polo tejido marfil, pantalón oliva y mocasines." width="540" height="657" loading="lazy" decoding="async"></div><figcaption><h3>Polo y pantalón</h3><p>Simple, cómodo y con un toque arreglado.</p></figcaption></figure></div><p class="field-note dress-note">No hace falta traje ni corbata. Estas ideas son solo inspiración: vení con algo que te haga sentir cómodo.</p></dialog>
 <dialog id="original" class="original-dialog" aria-label="Invitación original"><button class="close" aria-label="Cerrar"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><img src="assets/invitacion.webp" alt="Invitación original de Tatiana y Mauricio. Boda civil, 7 de noviembre de 2026 a las 17:00, Castelar 779 c/ Venezuela. Tenida cocktail."></dialog>`);
 let toastTimer;
 function toast(message){$('.toast').textContent=message;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('.toast').textContent='',3500)}
 async function copy(text){try{await navigator.clipboard.writeText(text);return true}catch{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();return ok}}
 document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const ok=await copy(cfg[b.dataset.copy]);toast(ok?'Copiado. Ya podés pegarlo.':'No se pudo copiar. Mantené presionado el dato para seleccionarlo.')}));
 document.querySelectorAll('[data-map]').forEach(a=>a.href=cfg.mapsUrl);
 const locationFold=$('.location-fold');
 locationFold.addEventListener('toggle',()=>{
  if(!locationFold.open)return;
  const frame=locationFold.querySelector('iframe');
  if(!frame.hasAttribute('src'))frame.src=frame.dataset.src;
 });
 document.querySelectorAll('[data-value]').forEach(el=>el.textContent=cfg[el.dataset.value]);
 let lastFocus;
 document.querySelectorAll('[data-dialog]').forEach(b=>b.addEventListener('click',()=>{lastFocus=b;$('#'+b.dataset.dialog).showModal();if(b.dataset.dialog==='rsvp')updateMessage()}));
 document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}});d.addEventListener('close',()=>lastFocus?.focus())});
 function composeRsvpMessage(name,attendance,companion){
  if(!attendance)return '';
  const guestName=name.trim()||'[tu nombre]';
  const greeting=`Hola Tati y Mau, soy ${guestName}.`;
  if(attendance==='no')return `${greeting}\n\nNo voy a poder acompañarlos en su boda del 7 de noviembre. Les deseo un día hermoso.`;
  const people=attendance==='acompanado'?`Vamos 2 personas: ${guestName} y ${companion.trim()||'[nombre de tu acompañante]'}.`:'Voy sin acompañante (1 persona).';
  const confirmation=attendance==='acompanado'?'Confirmo nuestra asistencia':'Confirmo mi asistencia';
  return `${greeting}\n\n${confirmation} a su boda del 7 de noviembre. ${people}\n\nGracias por invitarme a compartir este día.`;
 }
 function updateMessage(){
  const attendance=$('input[name="attendance"]:checked')?.value||'';
  const withCompanion=attendance==='acompanado';
  $('#companion-fields').hidden=!withCompanion;
  $('#companion').disabled=!withCompanion;
  $('#companion').required=withCompanion;
  $('#message').value=composeRsvpMessage($('#guest').value,attendance,$('#companion').value);
 }
 function clearRsvpError(field){field.setCustomValidity('');field.removeAttribute('aria-invalid');$('#'+field.id+'-error').hidden=true}
 ['guest','companion'].forEach(id=>$('#'+id).addEventListener('input',()=>{clearRsvpError($('#'+id));updateMessage()}));
 document.querySelectorAll('input[name="attendance"]').forEach(radio=>radio.addEventListener('change',()=>{
  $('#attendance-error').hidden=true;
  document.querySelectorAll('input[name="attendance"]').forEach(input=>{input.setCustomValidity('');input.removeAttribute('aria-invalid')});
  clearRsvpError($('#companion'));
  updateMessage();
 }));
 $('#rsvp-form').addEventListener('invalid',event=>{
  const field=event.target;
  const error=field.name==='attendance'?$('#attendance-error'):$('#'+field.id+'-error');
  if(!error)return;
  error.textContent=field.name==='attendance'?'Elegí si vas solo/a, con acompañante o si no podés asistir.':field.id==='companion'?'Escribí el nombre y apellido de tu pareja o acompañante.':'Escribí tu nombre y apellido.';
  error.hidden=false;field.setAttribute('aria-invalid','true');
 },true);
 const hasPhone=/^\d{10,15}$/.test(cfg.whatsapp);
 $('#rsvp-note').textContent=hasPhone?'Se abrirá el WhatsApp de Mau con tu respuesta. Revisala y tocá enviar.':'Copiá tu respuesta y compartila con Tati o Mau para confirmar.';
 $('#rsvp-submit').textContent=hasPhone?'Continuar en WhatsApp':'Copiar mi respuesta';
 $('#rsvp-form').addEventListener('submit',async e=>{
  e.preventDefault();updateMessage();
  $('#guest').setCustomValidity($('#guest').value.trim()?'':'Escribí tu nombre y apellido.');
  document.querySelectorAll('input[name="attendance"]').forEach(input=>input.setCustomValidity($('input[name="attendance"]:checked')?'':'Elegí si vas solo/a, con acompañante o si no podés asistir.'));
  $('#companion').setCustomValidity($('#companion').required&&!$('#companion').value.trim()?'Escribí el nombre y apellido de tu pareja o acompañante.':'');
  if(!$('#rsvp-form').reportValidity())return;
  if(hasPhone){window.open('https://wa.me/'+cfg.whatsapp+'?text='+encodeURIComponent($('#message').value),'_blank','noopener')}
  else{const ok=await copy($('#message').value);toast(ok?'Respuesta copiada. Compartila con Tati o Mau.':'Seleccioná el mensaje y copialo para enviarlo.')}
 });
 const target=new Date(cfg.date).getTime();
 function tick(){const diff=Math.max(0,target-Date.now());const units=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];document.querySelectorAll('[data-count]').forEach((el)=>{el.textContent=String(units[Number(el.dataset.count)]).padStart(2,'0')});if(!diff){document.querySelectorAll('[data-count-title]').forEach(el=>el.textContent='Llegó nuestro día')}}tick();setInterval(tick,1000);
 const guest=new URLSearchParams(location.search).get('para');if(guest){document.querySelectorAll('[data-guest]').forEach(el=>{el.textContent='Para vos, '+guest.slice(0,80);el.hidden=false})}
 document.querySelectorAll('[data-calendar]').forEach(b=>b.addEventListener('click',()=>{const date=new Date(cfg.date);const compact=d=>d.toISOString().replace(/[-:]/g,'').replace('.000','');const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Tati y Mau//Invitacion//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:20261107-boda-tati-mau@invitacion','DTSTAMP:20261030T120000Z','DTSTART:'+compact(date),'SUMMARY:Boda civil de Tati y Mau','LOCATION:'+cfg.address,'DESCRIPTION:Tenida cocktail. Boda civil de Tatiana y Mauricio.','END:VEVENT','END:VCALENDAR'];const blob=new Blob([lines.join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='boda-tati-y-mau.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);toast('Se descargó la fecha para tu calendario.')}));
 const audio=new Audio(cfg.music);audio.loop=true;audio.preload='metadata';audio.volume=.4;audio.muted=new URLSearchParams(location.search).has('silencio');
 const musicButton=$('.audio-toggle');musicButton.title=cfg.musicTitle;
 audio.id='wedding-music';audio.hidden=true;document.body.append(audio);
 let musicReady=false;let playbackRequested=false;const musicDownload=new AbortController();
 async function loadAudio(){if(musicReady)return;try{const response=await fetch(cfg.music,{signal:musicDownload.signal});if(!response.ok)throw Error('audio');const blob=await response.blob();if(!playbackRequested){audio.src=URL.createObjectURL(blob);musicReady=true}}catch{/* El archivo local sigue disponible como respaldo. */}}
 loadAudio();
 const syncMusic=()=>{const playing=!audio.paused;musicButton.setAttribute('aria-pressed',String(playing));musicButton.setAttribute('aria-label',playing?'Pausar música':'Reproducir música')};
 async function playMusic(){playbackRequested=true;if(!musicReady)musicDownload.abort();try{await audio.play();syncMusic()}catch{syncMusic();toast('Tocá el botón de música para escuchar.')}}
 musicButton.addEventListener('click',()=>{if(audio.paused)playMusic();else{audio.pause();syncMusic()}});audio.addEventListener('pause',syncMusic);audio.addEventListener('play',syncMusic);audio.addEventListener('error',()=>{musicButton.setAttribute('aria-pressed','false')});
 const opener=$('[data-open]');
 const intro=$('.intro');
 const main=$('main');
 const skip=$('[data-skip]');
 let opening=false;
 function finishOpening(){
  if(!opening)return;
  opening=false;
  intro.hidden=true;
  document.body.classList.remove('is-opening');
  document.body.classList.add('is-open');
  main.removeAttribute('inert');
  skip.hidden=true;
  main.focus({preventScroll:true});
 }
 async function openInvitation(){
  if(opening)return;
  opening=true;
  opener.disabled=true;
  opener.setAttribute('aria-expanded','true');
  skip.hidden=false;
  document.body.classList.add('is-opening');
  playMusic();
  const sequence=intro.getAnimations({subtree:true});
  await Promise.allSettled(sequence.map(a=>a.finished));
  finishOpening();
 }
 if(opener){opener.addEventListener('click',openInvitation);skip.addEventListener('click',finishOpening)}
 document.querySelectorAll('[data-replay]').forEach(button=>button.addEventListener('click',()=>{
  intro.hidden=false;
  document.body.classList.remove('is-open','is-opening');
  main.setAttribute('inert','');
  opener.disabled=false;
  opener.setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'instant'});
  opener.focus({preventScroll:true});
 }));
})();
