import { useGlobalState } from "../../Context/GlobalStateContext";
import SuccessAlertMessage from "../Alerts/SuccessAlertMessage";
import ClipboardJS from "clipboard";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorAlertMessage from "../Alerts/ErrorAlertMessage";

export default function ProfileUser() {
    const { user, updateProfile, loading, error, updatedProfile } = useGlobalState();
    const [errorUsername, setErrorUsername] = useState<string | boolean>(false);
    const [errorNewPassword, setErrorNewPassword] = useState<string | boolean>(false);
    const [errorTelegramNumber, setErrorTelegramNumber] = useState<string | boolean>(false);
    let registred = null;

    const [username, setUsername] = useState<string>(user?.name as string);
    const [newPassword, setNewPassword] = useState<string>();
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>();

    function checkUsername(fullName: string) {
        function isValidSingleName(name: string): boolean {
            if (!name || name.length <= 3) {
                setErrorUsername("Username must has at least 4 characters");
                return false;
            } else if (name.length > 16) {
                setErrorUsername("Username must has max 16 characters");
                return false;
            }

            const regexOfValidNamesWithAcents = /^[a-zA-ZÀ-ú]+$/g;
            return regexOfValidNamesWithAcents.test(name);
        }

        const names = fullName.split(" ");
        if (names.length > 1) {
            for (const name of names) {
                if (!isValidSingleName(name)) return false;
            }
        } else if (names.length <= 1) {
            if (!isValidSingleName(fullName)) return false;
        }

        return true;
    }

    function checkNewPassword(newPassword: string) {
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;

        const securePassword =
            specialCharRegex.test(newPassword) && uppercaseRegex.test(newPassword) && numberRegex.test(newPassword);

        if (newPassword.length < 12) {
            setErrorNewPassword("New Password must has at least 12 characters");
        } else if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
            setErrorNewPassword("Passwords not equal");
        } else if (!securePassword) {
            setErrorNewPassword("New Password must has at least 1 upperCase, 1 number and 1 special character");
        } else {
            setErrorNewPassword("");
        }
    }

    async function handleSubmitUpdateProfile(event: any) {
        event.preventDefault();

        if (newPassword) checkNewPassword(newPassword);

        if (username && checkUsername(username) && !errorTelegramNumber && !errorNewPassword) {
            setErrorUsername("");
            updateProfile({
                username: username ?? undefined,
                newPassword: newPassword ?? undefined,
                confirmNewPassword: confirmNewPassword ?? undefined,
            });
        }
    }

    return (
        <>
            {registred && (
                <SuccessAlertMessage
                    message={
                        registred === "true" &&
                        "Welcome, your password is your email! You can change your password in this page."
                    }
                />
            )}

            <div className="col-lg-5 mt-5">
                <form onSubmit={handleSubmitUpdateProfile}>
                    <small>
                        <span id="alert_name" className="fw-bold text-danger"></span>
                    </small>

                    <div className="form-group mb-3">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            min={4}
                            max={16}
                            className="fs-4 form-control"
                            defaultValue={user?.name as string}
                            name="name"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errorUsername && (
                            <small>
                                <span className="fw-bold text-danger">{errorUsername}</span>
                            </small>
                        )}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="fs-4 form-control"
                            name="email"
                            defaultValue={user?.email as string}
                            readOnly
                            disabled
                        />
                    </div>

                    <hr />

                    <div className="form-group mb-3">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            className="fs-4 form-control"
                            name="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input
                            type="password"
                            className="fs-4 form-control"
                            name="confirmNewPassword"
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    {errorNewPassword && (
                        <small>
                            <span className="fw-bold text-danger">{errorNewPassword}</span>
                        </small>
                    )}

                    {loading ? (
                        <button
                            type="submit"
                            className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-success"
                            disabled={true}
                        >
                            Processing...
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="button fs-4 mt-3 mb-3 w-50 btn btn btn-outline-success"
                            disabled={false}
                        >
                            Update Profile
                        </button>
                    )}

                    <ErrorAlertMessage message={error && !updatedProfile && `${error}`} />

                    <SuccessAlertMessage message={!error && updatedProfile && `Profile Updated!`} />
                </form>
            </div>
        </>
    );
}
