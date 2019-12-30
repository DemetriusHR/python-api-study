import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';

const initialStateDadosPessoa = {
  cpfPessoa: '',
  nmPessoa: '',
};

const About = () => {
  const [pessoas, setPessoas] = React.useState([]);
  const [idPessoa, setIdPessoa] = React.useState(1);
  const [dadosPessoa, setDadosPessoa] = React.useState(initialStateDadosPessoa);
  const [editaDados, setEditaDados] = React.useState(false);
  const [adicionaDados, setAdicionaDados] = React.useState(false);
  const [inputnmPessoaEditState, setInputnmPessoaEditState] = React.useState(
    ''
  );
  const [inputcpfPessoaEditState, setInputcpfPessoaEditState] = React.useState(
    ''
  );
  const [inputnmPessoaAddState, setInputnmPessoaAddState] = React.useState(
    ''
  );
  const [inputcpfPessoaAddState, setInputcpfPessoaAddState] = React.useState(
    ''
  );

  const onAttPessoas = React.useCallback(() => {
    window
      .fetch('http://127.0.0.1:5000/pessoas', {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'GET',
      })
      .then((r) => r.json())
      .then((response) => {
        setPessoas(response.pessoas);
      });
  }, []);

  React.useEffect(() => {
    onAttPessoas();
  }, []);

  const onChangeSelect = React.useCallback(({ target: { value } }) => {
    setIdPessoa(parseInt(value));
  }, []);

  const onPesquisarDados = React.useCallback(() => {
    window
      .fetch(`http://127.0.0.1:5000/pessoa?id=${idPessoa}`, {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'GET',
      })
      .then((r) => r.json())
      .then((response) => setDadosPessoa(response.pessoa));
  }, [idPessoa]);

  const onEditarDados = React.useCallback(() => {
    if (!dadosPessoa.cpfPessoa && !dadosPessoa.nmPessoa) {
      onPesquisarDados();
    }

    setInputnmPessoaEditState(dadosPessoa.nmPessoa);
    setInputcpfPessoaEditState(dadosPessoa.cpfPessoa);
    setEditaDados(true);
  }, [dadosPessoa, onPesquisarDados]);

  const onChangeInputNMEdit = React.useCallback(({ target: { value } }) => {
    setInputnmPessoaEditState(value);
  }, []);

  const onChangeInputCPFEdit = React.useCallback(({ target: { value } }) => {
    setInputcpfPessoaEditState(value);
  }, []);

  const onCancelaEdicao = React.useCallback(() => {
    setEditaDados(false);
  }, []);

  const onConfirmaEdicao = React.useCallback(() => {
    const bodyObj = {
      cpf_pessoa: inputcpfPessoaEditState,
      id: idPessoa,
      nm_pessoa: inputnmPessoaEditState,
    };

    window
      .fetch(`http://127.0.0.1:5000/pessoa`, {
        body: JSON.stringify(bodyObj),
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'PUT',
      })
      .then((r) => r.json());

    onAttPessoas();
    onCancelaEdicao();
    onPesquisarDados();
  }, [idPessoa, inputnmPessoaEditState, inputcpfPessoaEditState]);

  const onExcluirPessoa = React.useCallback(() => {
    const bodyObj = { id: idPessoa };

    window
      .fetch(`http://127.0.0.1:5000/pessoa`, {
        body: JSON.stringify(bodyObj),
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'DELETE',
      })
      .then((r) => r.json());

    onAttPessoas();
    setIdPessoa(1);
    onPesquisarDados();
  }, [idPessoa, onPesquisarDados]);

  const onAdicionaDados = React.useCallback(() => {
    setAdicionaDados(true);
  }, []);

  const onChangeInputNMAdd = React.useCallback(({ target: { value } }) => {
    setInputnmPessoaAddState(value);
  }, []);

  const onChangeInputCPFAdd = React.useCallback(({ target: { value } }) => {
    setInputcpfPessoaAddState(value);
  }, []);

  const onCancelaAdiciona = React.useCallback(() => {
    setAdicionaDados(false);
  }, []);

  const onConfirmaAdiciona = React.useCallback(() => {
    const bodyObj = {
      cpf_pessoa: inputcpfPessoaAddState,
      nm_pessoa: inputnmPessoaAddState,
    };

    window
      .fetch(`http://127.0.0.1:5000/pessoa`, {
        body: JSON.stringify(bodyObj),
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
      })
      .then((r) => r.json());

    onAttPessoas();
    onCancelaAdiciona();
    onPesquisarDados();
  }, [inputcpfPessoaAddState, inputnmPessoaAddState]);

  return (
    <>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <select onChange={onChangeSelect}>
        {pessoas.map((pessoa) => (
          <option
            key={pessoa.id}
            value={pessoa.id}
          >{`${pessoa.nmPessoa}`}</option>
        ))}
      </select>
      <br />
      <br />
      <button onClick={onPesquisarDados}>Pesquisar dados completos</button>
      <button onClick={onEditarDados}>Editar dados</button>
      <button onClick={onExcluirPessoa}>Excluir pessoa</button>
      <button onClick={onAdicionaDados}>Adicionar pessoa</button>
      <br />
      <br />
      {dadosPessoa.cpfPessoa && dadosPessoa.nmPessoa && !editaDados && !adicionaDados && (
        <p>
          <strong>Nome da Pessoa: </strong>
          {`${dadosPessoa.nmPessoa}`} <strong>CPF da Pessoa: </strong>
          {`${dadosPessoa.cpfPessoa}`}
        </p>
      )}
      {editaDados && (
        <React.Fragment>
          <h3>Edição de dados pessoais</h3>
          <label id="nmPessoa">Nome da Pessoa:</label>
          <input
            id="nmPessoa"
            value={inputnmPessoaEditState}
            onChange={onChangeInputNMEdit}
          />
          <br />
          <br />
          <label id="cpfPessoa">CPF da Pessoa:</label>
          <input
            id="cpfPessoa"
            value={inputcpfPessoaEditState}
            onChange={onChangeInputCPFEdit}
          />
          <br />
          <br />
          <button onClick={onCancelaEdicao}>Cancela Edição</button>
          <button onClick={onConfirmaEdicao}>Confirma Edição</button>
        </React.Fragment>
      )}
      {adicionaDados && (
        <React.Fragment>
          <h3>Adicionar pessoa</h3>
          <label id="nmPessoa">Nome da Pessoa:</label>
          <input
            id="nmPessoa"
            value={inputnmPessoaAddState}
            onChange={onChangeInputNMAdd}
          />
          <br />
          <br />
          <label id="cpfPessoa">CPF da Pessoa:</label>
          <input
            id="cpfPessoa"
            value={inputcpfPessoaAddState}
            onChange={onChangeInputCPFAdd}
          />
          <br />
          <br />
          <button onClick={onCancelaAdiciona}>Cancela adição de pessoa</button>
          <button onClick={onConfirmaAdiciona}>Confirma adição de pessoa</button>
        </React.Fragment>
      )}
      <br />
      <br />
      <Link href="/">
        <a>Voltar ao Home</a>
      </Link>
    </>
  );
};

export default About;
