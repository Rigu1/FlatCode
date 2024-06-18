export const handleRequest = (req, res, next) => {
  // 예제: 특정 경로에 대한 요청을 처리
  if (req.path === '/special-path') {
    // 요청 처리 로직
    res.send('Handled by handleRequest');
  } else {
    next();
  }
};
