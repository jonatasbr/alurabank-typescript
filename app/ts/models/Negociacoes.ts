import { Negociacao } from './Negociacao';
import { logarTempoDeExecucao } from '../helpers/decorators/index';

export class Negociacoes {

    private _negociacoes: Array<Negociacao> = [];

    @logarTempoDeExecucao(true)
    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao);
    }

    @logarTempoDeExecucao(true)
    paraArray(): Array<Negociacao> {
        // cast realizado por causa strictNullChecks fixado
        return ([] as Negociacao[]).concat(this._negociacoes);
    }
}