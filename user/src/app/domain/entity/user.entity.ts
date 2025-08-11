export type AuthProps = {
  id: string;
  email: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
};

export class User {
  private constructor(private readonly props: AuthProps) {}

  static create(props: AuthProps) {
    return new User(props);
  }

  static with(props: AuthProps) {
    return new User(props);
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get hash(): string {
    return this.props.hash;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toString() {
    return {
      id: this.props.id,
      email: this.props.email,
      hash: this.props.hash,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
