/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import { joiResolver } from "@hookform/resolvers/joi";
import { Button, FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../Validations/LoginSchema";
import axios from "axios";
import Title from "../../Components/Shared/Title";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../Store/UserSlice";
import PageFormContainer from "../../Components/Shared/PageFormContainer";
import FormWrapper from "../../Components/Shared/FormWrapper";
import { decode } from "../../Services/tokenService";

function Login() {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const initialFormData = {
        email: "",
        password: ""
    };

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: initialFormData,
        mode: "onChange",
        resolver: joiResolver(LoginSchema)
    });

    const onSubmit = async (form: typeof initialFormData) => {
        try {
            const token = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
                form
            );

            localStorage.setItem("token", token.data);

            const id = decode(token.data)._id;
            axios.defaults.headers.common['x-auth-token'] = token.data;
            const user = await axios.get("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/" + id);

            dispatch(userActions.login(user.data));

            toast.success("Login Successful");
            nav('/');
        } catch (error) {
            console.log(error);
            toast.error("Login Failed");
        }
    }

    return (
        <PageFormContainer>
            <FormWrapper
                className="md:w-1/3 sm:w-3/4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Title>Login</Title>

                <FloatingLabel
                    className="dark:bg-[#1f2937] dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                    type="email"
                    variant="outlined"
                    label="Email"
                    {...register("email")}
                    color={errors.email ? "error" : "success"}
                />
                <span className="mb-5 -mt-4 text-sm text-red-500">{errors.email?.message}</span>

                <FloatingLabel
                    className="dark:bg-[#1f2937] dark:text-[var(--background-color)] dark:border-[var(--background-color)]"
                    type="password"
                    variant="outlined"
                    label="Password"
                    {...register("password")}
                    color={errors.password ? "error" : "success"}
                />
                <span className="-mt-4 text-sm text-red-500">{errors.password?.message}</span>

                <Button
                    type="submit"
                    disabled={!isValid}
                    className="mt-5 btn dark:bg-[var(--primary-color)] dark:text-white"
                >
                    Login</Button>
            </FormWrapper>
        </PageFormContainer>
    );
}

export default Login;

