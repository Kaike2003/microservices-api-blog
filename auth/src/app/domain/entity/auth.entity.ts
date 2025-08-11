export type AuthProps = {
  id: string;
  email: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Auth {
  private constructor(private readonly props: AuthProps) {}

  static create({ email, hash }: Pick<AuthProps, "email" | "hash">) {
    return new Auth({
      id: "",
      email,
      hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static with(props: AuthProps) {
    return new Auth(props);
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
