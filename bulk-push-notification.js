const FCM = require('fcm-node');
const serverKey = 'FCM SERVER KEY';
const fcm = new FCM(serverKey);
const lodash = require('lodash')



let sendMultiUser = function (deviceToken, data){

    return new Promise((resolve , reject)=>{
        let message = {
            registration_ids: deviceToken,
            notification: {
                title:'PUSH',
                body: data.msg,
                sound: "default",
                badge:0
            },
            data:data,
            priority: 'high'
        };
        fcm.send(message, function(err, result){
            if (err) {
                console.log("Something has gone wrong!",err);
                resolve(null);
            } else {
                console.log("Successfully sent with response: ", result);
                resolve(null,result);
            }
        });

    })

};

const chunks = _.chunk(registration_ids, 1000);

const promises = _.map(chunks, (e) => {
    return sendMultiUser(e, message);
});

return Promise.all(promises);