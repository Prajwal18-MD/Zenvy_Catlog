
(function(){
  var d=document;
  /* nav shadow */
  var nav=d.getElementById('nav');
  function sc(){nav.classList.toggle('scrolled',window.scrollY>8)}
  sc();window.addEventListener('scroll',sc,{passive:true});
  /* reveal on scroll */
  var rv=[].slice.call(d.querySelectorAll('.rv')), steps=d.getElementById('steps');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    rv.forEach(function(el){io.observe(el)});
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target)}})},{threshold:.3});
    if(steps)io2.observe(steps);
  }else{rv.forEach(function(el){el.classList.add('in')});if(steps)steps.classList.add('in')}
  /* product tour tabs */
  var tabs=[].slice.call(d.querySelectorAll('.tab')),imgs=[].slice.call(d.querySelectorAll('.view img'));
  function pick(i){tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i?'true':'false');t.tabIndex=k===i?0:-1});imgs.forEach(function(m,k){m.classList.toggle('on',k===i)})}
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){pick(i)});
    t.addEventListener('keydown',function(e){var s=e.key==='ArrowDown'||e.key==='ArrowRight'?1:e.key==='ArrowUp'||e.key==='ArrowLeft'?-1:0;if(!s)return;var n=(i+s+tabs.length)%tabs.length;pick(n);tabs[n].focus();e.preventDefault()});
  });
  /* live queue demo */
  var a=d.getElementById('tq1'),b=d.getElementById('tq2'),tx=d.getElementById('tq');
  var st=[['3 patients ahead','~24 min wait'],['2 patients ahead','~16 min wait'],['1 patient ahead','~8 min wait'],['You’re next','Please head to the clinic']],k=0;
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    setInterval(function(){tx.style.opacity=0;setTimeout(function(){k=(k+1)%st.length;a.textContent=st[k][0];b.textContent=st[k][1];tx.style.opacity=1},300)},3200);
  }
  /* copy buttons */
  [].forEach.call(d.querySelectorAll('.copy'),function(btn){
    btn.addEventListener('click',function(){
      var v=btn.getAttribute('data-copy'),o=btn.textContent;
      function ok(){btn.textContent='Copied';setTimeout(function(){btn.textContent=o},1500)}
      function fb(){var r=d.createRange();r.selectNodeContents(btn.previousElementSibling);var s=getSelection();s.removeAllRanges();s.addRange(r)}
      try{navigator.clipboard.writeText(v).then(ok,fb)}catch(e){fb()}
    });
  });
})();
