// types.ts
export type RootStackParamList = {
    index: undefined;
    login: undefined;
    cadastro: undefined;
    configuracoes: undefined;
    perfil:undefined;
    editarPerfil:undefined;
    Home: undefined;
    ConfirmacaoCadastro: undefined;
    ValidarEmail: { email: string };
    ValidarCodigo: { email: string };
    RedefinirSenha: { email: string };
    FormFinancias:undefined;
    ResultadoPerfil: { perfil: string };
    planos:undefined;
    faq:undefined;
    gastos:undefined;
  };