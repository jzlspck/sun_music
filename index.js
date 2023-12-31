const lrc = `[00:00.000] 作词 : 邱振哲
[00:01.000] 作曲 : 邱振哲
[00:02.000]编曲 : 黄德霖 CJ
[00:03.000]原唱 : 邱振哲
[00:04.000]本作品经过原词曲作者以及版权公司授权
[00:05.000]
[00:19.860]你总感到落寞沮丧
[00:22.714]你总感到失望
[00:26.107]对于人生未来总有太多迷惘
[00:35.324]你总伪装自己不痛
[00:38.116]你总笑着逞强
[00:41.476]对于爱情害怕触碰 放弃挣扎
[00:49.945]你看着我眼睛
[00:53.900]你记着我声音
[00:57.749]无畏风雨
[00:59.711]别忘记还有我站在这里
[01:08.444]我只想做你的太阳 你的太阳
[01:12.724]在你的心里呀 在你的心底呀
[01:16.659]不管是多远的远方
[01:20.570]不要害怕我在身旁
[01:24.383]想做你的太阳 你的太阳
[01:28.193]在你的心里呀 在你的心底呀
[01:32.126]就算不能在你身旁
[01:35.991]也要奋力为你而发光
[01:42.336]
[01:48.834]你总感到落寞沮丧
[01:51.735]你总感到失望
[01:55.102]对于人生未来总有太多迷惘
[02:04.280]你总伪装自己不痛
[02:07.186]你总笑着逞强
[02:10.601]对于爱情害怕触碰 放弃挣扎
[02:19.008]你看着我眼睛
[02:22.890]你记着我声音
[02:26.713]无畏风雨
[02:28.668]别忘记还有我站在这里
[02:37.431]我只想做你的太阳 你的太阳
[02:41.726]在你的心里呀 在你的心底呀
[02:45.687]不管是多远的远方
[02:49.518]不要害怕我在身旁
[02:53.373]想做你的太阳 你的太阳
[02:57.252]在你的心里呀 在你的心底呀
[03:01.163]就算不能在你身旁
[03:04.996]也要奋力为你而发光
[03:10.084]也许有一天你不再记得我
[03:13.893]关于我们之间所有的所有
[03:17.817]没关系 只要你幸福就够
[03:27.811]我只想做你的太阳 你的太阳
[03:32.151]在你的心里呀 在你的心底呀
[03:35.999]不管是多远的远方
[03:39.833]不要害怕我在身旁
[03:43.735]想做你的太阳 你的太阳
[03:47.590]在你的心里呀 在你的心底呀
[03:51.462]就算不能在你身旁
[03:55.305]也要奋力为你而发光
[04:06.159]
[04:10.000]策划：朱鹏辉 / 李喆渊
[04:12.000]制作人：余竑龙
[04:14.000]执行制作：卢昌平
[04:16.000]合声编写：郁采真
[04:18.000]分轨混音：UDG
[04:20.000]人声混音：Wuli包子
[04:22.000]录音：音浪声音工作室`;
// lrc数组
const lrcArr = lrc.split('\n').map(item => {
   const timeArr = item.slice(1, 10).split(':');
   const time = timeArr[0] * 60 + Number(timeArr[1]);
   return {
      time,
      lrc: item.slice(11)
   }
});
const audio = document.querySelector('audio');
const lrcUl = document.querySelector('.lrc');
// 自适应高度居中
const MTop = (document.body.clientHeight - 540) / 2;
audio.style.marginTop = `${MTop}px`;
// 歌词内容li元素字符串
const content = lrcArr.reduce((pre, item) => pre+=`<li ${item.lrc ? '' : 'style="height: 15px;"'}>${item.lrc}</li>`, '');
// 插入页面
lrcUl.insertAdjacentHTML('beforeend', content);
let timer = null;
// 播放
audio.addEventListener('play', function(e) {
   timer = setInterval(() => {
      let i = lrcArr.findIndex((item, index) => lrcArr[index + 1].time > this.currentTime);
      // console.log(i);
      //if (!lrcArr[i].lrc) i--;
      handleActive(i);
   }, 1000);
});
// 切换当前行
function handleActive(i) {
   [...lrcUl.children].forEach(item => item.className = '');
   lrcUl.children[i].classList.toggle('active');
   // 
   moveLrcUl(i);
}
// 自动ul
function moveLrcUl(i) {
   const top = lrcUl.children[i].offsetTop;
   // console.log(top);
   if (top <= 200) lrcUl.style.transform = `translateY(0)`;
   else lrcUl.style.transform = `translateY(${-(top - 200)}px)`;
}
// 暂停
audio.addEventListener('pause', function() {
   clearInterval(timer);
});
