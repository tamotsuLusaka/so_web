const functions = require("firebase-functions");
const sgMail = require('@sendgrid/mail')


//環境変数
const config = functions.config()
const evn = config['so-web-c5883']

exports.helloWorld = functions.region('asia-northeast1').https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send(evn.test);
});

exports.test = functions.region('asia-northeast1').https.onCall( (data, context)=>{

  return data.name
})

exports.sendMail = functions.region('asia-northeast1').https.onCall( async (data, context)=>{
  sgMail.setApiKey(evn.sendgrid)
  let result = false
  const msgReceive ={
    to: 'info@so-design-studio.com',
    from: data.email,
    dynamic_template_data:{
      subject: data.title,
      name: data.name,
      email: data.email,
      content: data.text,
    },
    template_id: 'd-7677f45de03646b4a85ba2703f6322ef',
  }
  // 自動返信メール
  const msgReply ={
    to: data.email,
    from: 'info@so-design-studio.com',
    dynamic_template_data:{
      subject: data.title,
      name: data.name,
      email: data.email,
      content: data.text,
    },
    template_id: 'd-02ea7576c67e492b9b0beaf281f2ed98',
  }


  await sgMail.send(msgReceive)
  await sgMail.send(msgReply)
  .then(() => {
    result = true
  })
  .catch((error) => {
    result = false
  })
  return result
  
})

// exports.sync = functions.region('asia-northeast1').firestore.document('web/{wevId}').onWrite((snap, context) => {
//   console.log("きた")
//   console.log(snap.data().name)
// });