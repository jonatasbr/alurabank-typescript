class NegociacaoController {

    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
    //pode deixar apenas abaixo, mas eu gostei de especificar o tipo
    //private _negociacaoes = new Negociacoes();
    private _negociacaoes: Negociacoes = new Negociacoes();

    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement>document.querySelector('#valor');

        // atualiza a view para exibir os dados do modelo, vazio
        this._negociacoesView.update(this._negociacaoes);
    }
    
    adiciona(event: Event) {
        event.preventDefault();

        const negociacao = new Negociacao(
            new Date(this._inputData.value.replace(/-/g,',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )

        this._negociacaoes.adiciona(negociacao);

        // depois de adicionar, atualiza a view novamente para refletir os dados
        this._negociacoesView.update(this._negociacaoes);
        this._mensagemView.update('Negociação adicionada com sucesso.');


/*        this._negociacaoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data);
            console.log(negociacao.quantidade);
            console.log(negociacao.valor);
        });    
*/
   }
}