  
const got = reuqire('got');
const  tunnel = reuqire('tunnel');
async function getArticleList0 (){
      var  options  =  {
          prefixUrl: 'http://zxt.agiapp.com',
          headers:  {
              'Host':  'zxt.agiapp.com',
              'Accept':  'application/json, text/javascript, */*; q=0.01',
              'X-Requested-With':  'XMLHttpRequest',
              'Accept-Encoding':  'gzip, deflate',
              'Accept-Language':  'zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.5;q=0.4',
              'User-Agent':  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1278.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2875.116 Safari/537.36 NetType/WIFI MicroMessenger/7.0.5 WindowsWechat',
              'Cookie':  'PHPSESSID=au8nf10lpnksdlns8d7om2nau6; zxt_WECHAT_CLIENT_ID=D5BC53wCm1SHa; UM_distinctid=16dc99cfb3d1ab-0046774fee3d63-60c1274-1fa400-16dc99cfb3e3ea; zxt_OPENID=gFj3DOSGzOjoP7WOX7DFzIydBINHmHyhmQxDhxy%3D5; zxt_UNIONID=D5Fn7tS%3DO7jkjaYnB%3DUPDs2Az-CTr%3DwXWpSQ0uCvwd7il; zxt_WECHAT_CLIENT_ID=Y6GZCkUdnoc5u; CNZZDATA1277638470=828401837-1571043707-%7C1571124875; zxt_UID=1mXponeGGqAjK'
          },
          agent:  tunnel.httpOverHttp({
              proxy:  {
                  host:  '172.16.211.38',
                  port:  8100
              }
          }),
          timeout:  5000,
          json:  true
      };

      var  url  =  'http://zxt.agiapp.com/index/Tthk/fetchTagArts?tag=h_24&refresh=0';
      let res  =  await  got.get(url,  options);

      console.log("=======");

      return  res.body;
  }

