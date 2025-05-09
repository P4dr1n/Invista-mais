// types.ts
export type RootStackParamList = {
    index: undefined;
    login: undefined;
    Cadastro: undefined;
    Home: undefined;
    ConfirmacaoCadastro: undefined;
    ValidarEmail: { email: string };
    ValidarCodigo: { email: string };
    RedefinirSenha: { email: string };
  };