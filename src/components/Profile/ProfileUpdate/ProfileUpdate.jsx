import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/authProvider";
import { Box } from "@mui/system";
import { Badge, IconButton, Avatar, TextField, Input } from "@mui/material";
import { updateAvatar, updateProfile } from "api/userApi";
import EditIcon from "@mui/icons-material/Edit";
import router from "next/router";

const ProfileUpdate = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [img, setImg] = useState();
    const [imgUpdate, setImgUpdate] = useState("");

    const [username, setUsername] = useState(auth?.username);
    const [password, setPassword] = useState("");
    const [name, setName] = useState(auth?.name);
    const [address, setAddress] = useState(auth?.address);
    const [email, setEmail] = useState(auth?.email);
    const [phone, setPhone] = useState(auth?.phone);

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

    const hanleUpdateProfile = async () => {
        const data = {
            id: auth?.id,
            username: username || auth?.username,
            password: password || auth?.password,
            name: name || auth?.name,
            address: address || auth?.address,
            email: email || auth?.email,
            phone: phone || auth?.phone,
            createdDate: auth?.createdDate,
            roleId: auth?.roleId,
            active: auth?.active,
        };
        try {
            const response = await updateProfile(data);
            setAuth((prevState) => ({ ...prevState, ...response }));
            setUsername("");
            setPassword("");
            setName("");
            setAddress("");
            setEmail("");
            setPhone("");
            return router.push("/");
        } catch (err) {
            console.log(err);
        }
    };

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
                        defaultValue={auth?.username}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        id="password"
                        label="Mật Khẩu"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        id="name"
                        label="Họ Tên"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        id="address"
                        label="Địa Chỉ"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        id="phone"
                        label="Số Điện Thoại"
                        variant="standard"
                        margin="normal"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div style={{ marginTop: 20 }}>
                    <button className="btn" onClick={hanleUpdateProfile}>
                        Cập Nhật
                    </button>
                </div>
            </div>
        </Box>
    );
};

export default ProfileUpdate;
