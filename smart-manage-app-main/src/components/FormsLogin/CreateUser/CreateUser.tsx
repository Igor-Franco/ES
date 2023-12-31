import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider/useAuth";
import styles from "./CreateUser.module.scss";
import Button from "../../Button/Button";
import { useUserLogged } from "../../../Context/UserProvider/useGetUser";

type createUserProps = {
  changeForm?: () => void;
};

const CreateUser = ({ changeForm }: createUserProps) => {
  const { createUser, authenticate } = useAuth();
  const { updateUserLogged } = useUserLogged();
  const navigate = useNavigate();

  async function onSubmitCreateUser(event: FormEvent) {
    event.preventDefault();
    try {
      await createUser(
        nameRef.current?.value,
        emailRef.current?.value,
        passwordRef.current?.value,
        roleRef.current?.value,
      );
      await authenticate(emailRef.current?.value, passwordRef.current?.value);
      await updateUserLogged();

      navigate("/");
    } catch (error) {
      alert("Usuário já existe");
    }
  }

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLSelectElement>(null);

  return (
    <section>
      <form onSubmit={onSubmitCreateUser} className={styles.inputsContainer}>
        <div className={styles.input}>
          <label htmlFor="name">Nome:</label>
          <input ref={nameRef} type="text" name="name" id="name" required />
        </div>
        <div className={styles.input}>
          <label htmlFor="email">Email:</label>
          <input ref={emailRef} type="text" name="email" id="email" required />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Senha:</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="password">Role:</label>
          <select
            ref={roleRef}
            className={styles.selectRole}
            name="role"
            id="role"
          >
            <option value="frontend">Front-End</option>
            <option value="backend">Back-End</option>
            <option value="fullstack">Full-Stack</option>
            <option value="manager">Manager</option>
            <option value="productOwner">Product Owner</option>
          </select>
        </div>
        <div className={styles.buttons}>
          <Button type="submit">Criar conta</Button>
          <Button change={changeForm}>Já tenho conta</Button>
        </div>
      </form>
    </section>
  );
};

export default CreateUser;
