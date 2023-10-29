import { Component, ReactElement } from "react";

interface ResultItemProps {
  key: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}

class ResultItem extends Component<ResultItemProps> {
  constructor(props: ResultItemProps) {
    super(props);
  }

  render(): ReactElement {
    const { name, weight, height, image } = this.props;

    return (
      <div className="card">
        <div className="card__image">
          <img className={image ? "image" : "image--empty"} src={image} alt={name} />
        </div>
        <div className="card__data">
          <h3 className="card__data_name">{name.replace(/-/gi, " ")}</h3>
          <span>Weight: {weight}</span>
          <span>Height: {height}</span>
        </div>
      </div>
    );
  }
}

export default ResultItem;
