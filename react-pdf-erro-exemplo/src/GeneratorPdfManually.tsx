import React from 'react';
import {
  Text,
  View,
  Document as _document,
  Page as _page,
  StyleSheet,
} from '@react-pdf/renderer';

const Document: any = _document;
const Page: any = _page;


const styles = StyleSheet.create({
  pagina: {
    fontFamily: 'Tinos',
    padding: '25 15 25 15',
  },
  header: {
    position: 'relative',
  },
  data: {
    fontSize: 9,
  },
});

const calcularAlturaItem = (movimento: any): number => {
  const larguraColunaDescricao = 36; // Número estimado de caracteres por linha
  const descricao = movimento.historico || '';
  const linhasDescricao = Math.ceil(descricao.length / larguraColunaDescricao);
  const alturaBase = 15; // Altura base de cada linha
  return alturaBase * linhasDescricao; // Altura total do item
};

const calcularAlturaLinhaItem = (
  largura: number,
  descricao: string
): number => {
  const alturaBase = 15;

  const linhasDescricao = Math.ceil(descricao.length / largura);
  return alturaBase * linhasDescricao;
};

const adicionarPagina = (
  paginas: any[],
  movimentosPagina: any[],
  exibirTituloProduto: boolean
): void => {
  paginas.push({ movimentos: [...movimentosPagina], exibirTituloProduto });
};

const GeneratorPdfManually: React.FC<
  any
> = ({ dados }) => {
  const ALTURA_MAXIMA_POR_PAGINA = 1100;
  const ALTURA_CABECALHO_TABELA = 100;

  return (
    <Document>
      {dados.listaDados.map((dado: any) => {
        const movimentos = dado.listaMovimentos || [];
        const paginas: any[] = [];
        let alturaAtual = ALTURA_CABECALHO_TABELA; // Altura inicial
        let movimentosPagina: any[] = [];
        let exibirTituloProduto = true; // Exibir título do produto apenas na primeira página

        movimentos.forEach((movimento: any) => {
          const alturaItem = calcularAlturaItem(movimento); // Calcula a altura do item
          alturaAtual += alturaItem;

          if (alturaAtual > ALTURA_MAXIMA_POR_PAGINA) {
            adicionarPagina(paginas, movimentosPagina, exibirTituloProduto);
            movimentosPagina = []; // Reseta os movimentos para a próxima página
            alturaAtual = ALTURA_CABECALHO_TABELA + alturaItem; // Reinicia a altura com o item atual
            exibirTituloProduto = false; // Título já exibido
          }

          movimentosPagina.push(movimento);
        });

        // Adiciona a última página, se necessário
        if (movimentosPagina.length > 0) {
          adicionarPagina(paginas, movimentosPagina, exibirTituloProduto);
        }

        // Renderiza cada página
        return paginas.map((pagina, paginaIndex) => (
          <Page
            style={styles.pagina}
            orientation="portrait"
            key={`${dado.produto.idProduto}-${paginaIndex}`}
          >
            <View style={styles.header} fixed>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 11 }}>
                    {dados.cabecalho.nomeEmpresa}
                  </Text>
                  <Text style={{ fontSize: 11 }}>
                    {dados.cabecalho.tituloRelatorio}
                  </Text>
                </View>
              </View>

              {dados.cabecalho.possuiFiltro && (
                <View
                  style={{
                    fontSize: 9,
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      width: '10%',
                      height: '100%',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginRight: '5px',
                    }}
                  >
                    <Text>Filtros:</Text>
                  </View>
                  <View
                    style={{
                      width: '90%',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                  >
                    {dados.cabecalho.filtroData && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>{'Data: '}</Text>
                          {dados.cabecalho.filtroData}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroProduto && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            {'Produto: '}
                          </Text>
                          {dados.cabecalho.filtroProduto}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroPessoa && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            {'Pessoa: '}
                          </Text>
                          {dados.cabecalho.filtroPessoa}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroCodigo && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            {'Código: '}
                          </Text>
                          {dados.cabecalho.filtroCodigo}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroLote && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>{'Lote: '}</Text>
                          {dados.cabecalho.filtroLote}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroDescricao && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            {'Descrição: '}
                          </Text>
                          {dados.cabecalho.filtroDescricao}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroTipoBuscaCodigoDescricao && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            {'Filtro Código/Descrição: '}
                          </Text>
                          {dados.cabecalho.filtroTipoBuscaCodigoDescricao}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroGrupo && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            {'Grupo: '}
                          </Text>
                          {dados.cabecalho.filtroGrupo}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroLocalEstoque && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            {'Local de Estoque: '}
                          </Text>
                          {dados.cabecalho.filtroLocalEstoque}
                        </Text>
                      </View>
                    )}

                    {dados.cabecalho.filtroSomenteProdutoComSaldo && (
                      <View>
                        <Text>
                          <Text style={{ fontWeight: 'bold' }}>
                            Somente Produtos com Saldo
                          </Text>
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{ fontSize: 9 }}
                  render={({ pageNumber, totalPages }) => {
                    return `Página ${pageNumber} de ${totalPages}`;
                  }}
                  fixed
                />
              </View>
            </View>

            <View style={{ fontSize: 8, width: '100%', flex: 1 }}>
              <View
                fixed
                style={{
                  flexDirection: 'row',
                  borderBottom: '2pt solid black',
                  fontSize: 9,
                  fontWeight: 'bold',
                }}
              >
                <View style={{ width: '10%' }}>
                  <Text>Número</Text>
                </View>
                <View style={{ width: '1%' }} />

                <View style={{ width: '20%' }}>
                  <Text>Data Movimento</Text>
                </View>
                <View style={{ width: '1%' }} />

                <View style={{ width: '36%' }}>
                  <Text>Histórico</Text>
                </View>
                <View style={{ width: '1%' }} />

                <View style={{ width: '14%', alignItems: 'flex-end' }}>
                  <Text>Quantidade</Text>
                </View>
                <View style={{ width: '1%' }} />

                <View style={{ width: '14%', alignItems: 'flex-end' }}>
                  <Text>Saldo</Text>
                </View>
                <View style={{ width: '1%' }} />
              </View>

              <View
                key={dado.produto.idProduto}
                style={{
                  borderBottom: '1pt dashed black',
                  paddingVertical: '5pt',
                }}
              >
                {/* Exibir Título do Produto Apenas na Primeira Página */}
                {pagina.exibirTituloProduto && (
                  <View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        paddingHorizontal: '15pt',
                        marginBottom: '5pt',
                      }}
                    >
                      <View style={{ alignSelf: 'flex-start', width: '49%' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                          {`Produto: ${dado.produto.codigo} - ${dado.produto.descricao}`}
                        </Text>
                      </View>
                      <View style={{ width: '1%' }} />

                      <View style={{ alignSelf: 'center', width: '24%' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                          {`L. Est: ${
                            dado.localEstoque.descricao ||
                            'SEM LOCAL DE ESTOQUE'
                          }`}
                        </Text>
                      </View>
                      <View style={{ width: '1%' }} />

                      <View style={{ marginLeft: 'auto', width: '25%' }}>
                        <Text style={{ fontWeight: 'bold' }}>
                          Tipo: {dado.tipo}
                        </Text>
                      </View>
                    </View>
                    {dado.pessoa &&
                      dado.pessoa.codigo &&
                      dado.pessoa.nomeRazaoSocial && (
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            paddingHorizontal: '15pt',
                            marginBottom: '5pt',
                          }}
                        >
                          <View
                            style={{ alignSelf: 'flex-end', width: '100%' }}
                          >
                            <Text
                              style={{ fontWeight: 'bold', textAlign: 'right' }}
                            >
                              {`Pessoa: ${dado.pessoa.codigo} - ${dado.pessoa.nomeRazaoSocial}`}
                            </Text>
                          </View>
                        </View>
                      )}
                  </View>
                )}
                {/* Movimentos */}
                {pagina.movimentos.map((movimento: any, i: any) => (
                  <View
                    key={`${movimento.numeroDocumento}-${i}`}
                    style={{
                      flexDirection: 'row',
                      backgroundColor: i % 2 === 0 ? '#E4E4E4' : '#fff',
                    }}
                  >
                    <View style={{ width: '10%' }}>
                      <Text>{movimento.numeroDocumento}</Text>
                    </View>
                    <View style={{ width: '1%' }} />

                    <View style={{ width: '20%' }}>
                      <Text>
                        {movimento.dataMovimento}
                      </Text>
                    </View>
                    <View style={{ width: '1%' }} />

                    <View style={{ width: '36%' }}>
                      <Text>{movimento.historico}</Text>
                    </View>
                    <View style={{ width: '1%' }} />

                    <View style={{ width: '14%', alignItems: 'flex-end' }}>
                      <Text>{movimento.quantidade}</Text>
                    </View>
                    <View style={{ width: '1%' }} />

                    <View style={{ width: '14%', alignItems: 'flex-end' }}>
                      <Text>{movimento.saldo}</Text>
                    </View>
                    <View style={{ width: '1%' }} />
                  </View>
                ))}
              </View>
            </View>

            <View
              fixed
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                fontSize: 9,
              }}
            >
              <Text>
                {`Impresso por Username em dd/mm/yyyy às 00:00:00`}
              </Text>
              <Text>https://www.link.to.random.website</Text>
            </View>
          </Page>
        ));
      })}
    </Document>
  );
};

export default GeneratorPdfManually;
