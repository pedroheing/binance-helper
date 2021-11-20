import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from "moment";
import { CurrencyMaskInputMode } from 'ngx-currency';

export interface ResultadoTaxa {
  // ativo do ativo
  ativo: string
  // data da operação
  data: Date
  // tipo de operação
  operacao: Operacao
  // quantidade de ativos movimentados
  quantidade: string
  // preco do ativo
  preco: number
  // taxas da corretora
  taxa: number
}

export enum Operacao {
  Compra = "C",
  Venda = "V"
}

@Component({
  selector: 'app-taxas-ordem',
  templateUrl: './taxas-ordem.component.html',
  styleUrls: ['./taxas-ordem.component.scss']
})
export class TaxasOrdemComponent implements OnInit {
  public operacoes = Operacao;
  public form: FormGroup;
  public dataSource: MatTableDataSource<ResultadoTaxa>;
  public displayedColumns: string[] = ['ativo', 'data', 'operacao', 'quantidade', 'taxa', 'acoes'];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.dataSource = new MatTableDataSource();
    this.form = this.formBuilder.group({
      ativo: ['', Validators.required],
      data: [new Date(), Validators.required],
      operacao: [Operacao.Compra, Validators.required],
      quantidade: [0, Validators.required],
      preco: [0, Validators.required]
    })
  }

  ngOnInit(): void {
  }

  public calcular() {
    const dados = this.form.value;
    const valorCriptoTaxa = dados.quantidade * 0.001;
    const taxa = (dados.quantidade * dados.preco) * 0.001;
    this.dataSource.data.push({
      ativo: dados.ativo,
      data: dados.data,
      operacao: dados.operacao,
      quantidade: (dados.quantidade - valorCriptoTaxa).toFixed(8),
      preco: dados.preco,
      taxa: taxa
    })
    this.dataSource.filter = ""
  }

  public limpar() {
    this.dataSource = new MatTableDataSource();
  }

  public exportarParaExcel() {
    const wb = XLSX.utils.book_new();
    const ws_name = "sheet";
    var ws_data = [
      ['ativo', 'date', 'tipoOP', 'qtd', 'preco', 'taxas', 'corretora', 'irrf', 'moeda'],
      ... this.dataSource.data.map(d => {
          return [d.ativo, moment(d.data).format('DD/MM/YYYY'), d.operacao, d.quantidade.toString().replace('.', ','), d.preco.toLocaleString('de-DE', {
            minimumFractionDigits: 8,
          }), d.taxa, 'BINANCE', 0, 'BRL']
      })
    ];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, 'result.xlsb');
  }

  public remover(i: number) {
    this.dataSource.data.splice(i, 1);
    this.dataSource.filter = ""
  }

}
