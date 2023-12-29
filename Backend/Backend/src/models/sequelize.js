const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fall2324w3g5', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
});


// Kiểm tra kết nối cơ sở dữ liệu
sequelize.authenticate().then(() => {
    console.log('Kết nối cơ sở dữ liệu thành công.');
  }).catch((error) => {
    console.error('Lỗi kết nối cơ sở dữ liệu:', error);
  });

module.exports = sequelize; // Xuất đối tượng Sequelize để sử dụng ở nhiều nơi khác trong dự án