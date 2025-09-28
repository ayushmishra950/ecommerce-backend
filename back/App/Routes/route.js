
module.exports = (app) => {

const loginControll = require('../Controller/loginController')
      app.post('/register', loginControll.registration);
      app.get('/login',loginControll.login);
      app.get('/user',loginControll.full_Information);
      app.get('/logout',loginControll.logout);
      app.post('/changepassword',loginControll.passwordchange);
      app.get('/userinfo',loginControll.userinfo);

    const controll = require('../Controller/controller');
    app.get('/', controll.get);
    app.post('/insert', controll.insert);
    app.get('/category', controll.category)
    app.get('/categoryOne/:category', controll.categoryOne)
    app.post('/filter',controll.filters)
}