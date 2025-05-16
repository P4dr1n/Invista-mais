// types.ts
export type RootStackParamList = {
    index: undefined;
    login: undefined;
    cadastro: undefined;
    Configuracoes: undefined;
    perfil:undefined;
    editarPerfil:undefined;
    Home: undefined;
    ConfirmacaoCadastro: undefined;
    ValidarEmail: { email: string };
    ValidarCodigo: { email: string };
    RedefinirSenha: { email: string };
  };