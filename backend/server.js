const app = require('./app');
const PORT = process.env.PORT || 5000; // 환경 변수에서 포트 가져오기

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use`);
    } else {
        console.log(err);
    }
});