import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacao, Negociacoes, NegociacaoParcial } from '../models/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService, ResponseHandler } from '../services/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;
    @domInject('#quantidade')
    private _inputQuantidade: JQuery;
    @domInject('#valor')
    private _inputValor: JQuery;
    //pode deixar apenas abaixo, mas eu gostei de especificar o tipo
    //private _negociacaoes = new Negociacoes();
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _service = new NegociacaoService();

    constructor() {
        // sem necessidade, pois agora tem o decorator @domInject
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $('#valor');

        // atualiza a view para exibir os dados do modelo, vazio
        this._negociacoesView.update(this._negociacoes);
    }
    
    @throttle()
    adiciona(event: Event) {
        //retirado pelo throttle
        //event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));
        if(!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!');
            return;
        }

        const negociacao = new Negociacao(
            //new Date(this._inputData.val().replace(/-/g,',')),
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        this._negociacoes.adiciona(negociacao);

        // depois de adicionar, atualiza a view novamente para refletir os dados
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso.');
   }

   private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo;
    }

    @throttle()
    importarDados() {
        // retirado pela interface
        // function isOK(res: Response) {
        //     if(res.ok) {
        //         return res;
        //     } else {
        //         throw new Error(res.statusText);
        //     }
        // }
        // colocar o arrow function diretamente 
        // const isOK: ResponseHandler = (res: Response) => {
        //     if(res.ok) return res;
        //     throw new Error(res.statusText);
        // }

        this._service
            .obterNegociacoes(isOk)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => 
                    this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            });

        // retirado pelo service
        // fetch('http://localhost:8080/dados')
        //     .then(res => isOK(res))
        //     .then(res => res.json())
        //     .then((dados: NegociacaoParcial[]) => {
        //         dados
        //             .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
        //             .forEach(negociacao => this._negociacoes.adiciona(negociacao));
        //         this._negociacoesView.update(this._negociacoes);
        //     })
        //     .catch(err => console.log(err.message));
    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta, 
    Quinta, 
    Sexta, 
    Sabado, 
}
