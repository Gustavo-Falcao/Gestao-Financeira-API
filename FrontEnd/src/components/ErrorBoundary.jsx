import React from "react";
import "../styles/ErrorBoundary.css";

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "Erro capturado pelo Error Boundary:",
      error,
      errorInfo
    );
  }

  render() {

    if (this.state.hasError) {

      return (
        <div className="error-page">

          <h1>⚠️ Algo deu errado</h1>

          <p>
            Ocorreu um erro inesperado na aplicação.
          </p>

          <p>
            {this.state.error?.message}
          </p>

          <button
            onClick={() =>
              window.location.href =
                "/dashboard"
            }
          >
            Voltar ao Dashboard
          </button>

        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;