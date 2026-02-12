export interface Usuario {
    id: number;
    name: string;
    email: string;
    password: string;
}

export type MaintainUsuarioRequest = Omit<Usuario, 'id'> & { confirmPassword: string };
