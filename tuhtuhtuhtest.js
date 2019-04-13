const getReport = (dataId) => {
  superagent.get(`https://api.metadefender.com/v4/file/:${dataId}`)
    .set('apikey', `${process.env.API_KEY}`)
    .then(res => {
      console.log(res.body);
    })
    .catch(console.log);
};
getReport('');