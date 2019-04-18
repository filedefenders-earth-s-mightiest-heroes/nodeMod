'use strict';



const uploadFile = (FILEPATH) => {
    let ext = FILEPATH.split('.')
    if (support.includes(ext[1].toUpperCase())){
        superagent.post('https://localhost:3000/')
            .set('rule', 'sanitize')
            //connor - if filetype scrubbing is supported, set rule for sanitize:
            .set('apikey', `${process.env.API_KEY}`)
            .set('Content-Type', 'application/octet-stream')
            .send(FILEPATH)
            .then(res => {
                getReport(res.body.data_id, FILEPATH);
            })
            .catch(console.log);
    }else{
        superagent.post('https://localhost:3000/')
        //connor - if filetype scrubbing is supported, set rule for sanitize:
            .set('apikey', `${process.env.API_KEY}`)
            .set('Content-Type', 'application/octet-stream')
            .send(FILEPATH)
            .then(res => {
                getReport(res.body.data_id, FILEPATH);
            })
            .catch(console.log);
    }
}
const getReport = (dataId) => {
    superagent.get(`https://api.metadefender.com/v4/file/${dataId}`)
        .set('apikey', `${process.env.API_KEY}`)
        .then(res => {
            let progress = res.body.scan_results.scan_all_result_a;
            if (progress === 'In Progress'){
                getReport(dataId);
            }else{
                let report = {
                    status: progress,
                    ID:dataId,
                    filePath:FILEPATH
                };
                endGame(report);
            }
        })
        .catch(console.log);
};
