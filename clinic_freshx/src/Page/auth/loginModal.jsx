import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login'; // hoặc thư viện tương thích khác

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px', // Thêm border-radius cho góc bo tròn
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Đăng ký</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đăng ký tài khoản Fresh-X
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng sẽ bị khóa.
          </Typography>
          <GoogleLogin
              onSuccess={credentialResponse => {
                  console.log(credentialResponse);
              }}
              onError={() => {
                  console.log('Login Failed');
              }}
          />
          <FacebookLogin
              appId="YOUR_FACEBOOK_APP_ID" // Cần thay thế bằng App ID của bạn
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook => {
                  console.log(responseFacebook);
              }}
              icon="fa-facebook"
          />
          <Button variant="outlined" fullWidth>Sử dụng Email / số điện thoại</Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Bạn đã có tài khoản? <a href="#">Đăng nhập ngay</a>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: 'red' }}>
            <a href="#">Bạn quên mật khẩu</a>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}