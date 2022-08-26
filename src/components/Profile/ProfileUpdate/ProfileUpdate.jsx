import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/authProvider";
import { Box } from "@mui/system";
import { Badge, IconButton, Avatar, TextField, Input } from "@mui/material";
import { updateAvatar } from "api/userApi";
import EditIcon from "@mui/icons-material/Edit";

const ProfileUpdate = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [img, setImg] = useState();
    const [imgUpdate, setImgUpdate] = useState("");
    const style = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
    };
    console.log(auth);

    useEffect(() => {
        (async () => {
            if (img) {
                const formData = new FormData();
                try {
                    formData.append("file", img);
                    const response = await updateAvatar(formData, {
                        userId: auth?.id,
                        name: auth?.name,
                    });
                    setImgUpdate(response);
                    setImg("");
                } catch (err) {
                    console.log(err);
                }
            }
        })();
    }, [img]);

    return (
        <Box sx={style}>
            <div>
                <h5 style={{ textAlign: "center", marginBottom: 10 }}>
                    Ảnh Đại Diện
                </h5>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                        <label
                            htmlFor="icon-button-file"
                            style={{
                                borderRadius: "9999px",
                                backgroundColor: "#e5e7eb",
                            }}
                        >
                            <input
                                style={{ display: "none" }}
                                id="icon-button-file"
                                type="file"
                                onChange={(e) => setImg(e.target.files[0])}
                            />
                            <IconButton
                                aria-label="upload picture"
                                component="span"
                            >
                                <EditIcon />
                            </IconButton>
                        </label>
                    }
                >
                    <Avatar
                        src={imgUpdate || auth?.imageUrl}
                        alt={auth?.name}
                        sx={{
                            width: "120px",
                            height: "120px",
                            margin: "0 auto",
                            border: "0.1px solid lightgray",
                        }}
                    ></Avatar>
                </Badge>
            </div>
            <div style={{ width: "50%" }}>
                <h5 style={{ textAlign: "center" }}>Thông Tin Cá Nhân</h5>
                <div>
                    <TextField
                        id="username"
                        label="Tên Đăng Nhập"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        placeholder={auth?.username}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Mật Khẩu"
                        variant="standard"
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div>
                    <TextField
                        id="name"
                        label="Họ Tên"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        placeholder={auth?.name}
                    />
                </div>
                <div>
                    <TextField
                        id="address"
                        label="Địa Chỉ"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        placeholder={auth?.address}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        placeholder={auth?.email}
                    />
                </div>
                <div>
                    <TextField
                        id="phone"
                        label="Số Điện Thoại"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        placeholder={auth?.phone}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <button className="btn">Cập Nhật</button>
                </div>
            </div>
        </Box>
    );
};

export default ProfileUpdate;
