import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private name: string,
    private email: Email,
    private readonly createAt: Date,
    private updateAt: Date,
  ) {}

  static create(name: string, email: string) {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    return new User(
      new UserId(),
      name.trim(),
      new Email(email),
      new Date(),
      new Date(),
    );
  }

  getId(): UserId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getCreateAt(): Date {
    return this.createAt;
  }

  getUpdateAt(): Date {
    return this.updateAt;
  }

  updateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    this.name = name.trim();
    this.updateAt = new Date();
  }

  updateEmail(email: string) {
    this.email = new Email(email);
    this.updateAt = new Date();
  }

  getAccountAge(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
