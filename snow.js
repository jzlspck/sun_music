window.addEventListener('load', function() {
   /** @type {HTMLCanvasElement} */
   const canvas = document.querySelector('canvas');
   const ctx = canvas.getContext('2d');
   const x = window.innerWidth;
   const y = window.innerHeight;
   canvas.width = x;
   canvas.height = y;
   const num = x > 768 ? 200 : 50; // 雪花数量
   const size = x > 768 ? 5 : 2; // 雪花数量
   const snows = [];
   for (let i = 0; i < num; i++) {
      snows.push({
         x: Math.random() * x, 
         y: Math.random() * y, 
         r: Math.random() * size + 1, 
      });
   }
   function draw() {
      ctx.clearRect(0, 0, x, y);
      ctx.beginPath();
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 10;
      snows.forEach(item => {
         ctx.moveTo(item.x, item.y);
         ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
      });
      ctx.fill();
      ctx.closePath();
      move();
   }
   function move() {
      snows.forEach(item => {
         item.x += Math.random() * 2 + 1;
         item.y += Math.random() * 2 + 1;
         if (item.x > x) item.x = 0;
         if (item.y > y) item.y = 0;
      });
   }
   setInterval(draw, 30);
})