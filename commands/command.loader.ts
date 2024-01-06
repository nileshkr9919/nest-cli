import * as chalk from 'chalk';
import { CommanderStatic } from 'commander';
import {
  AddAction,
  BuildAction,
  GenerateAction,
  InfoAction,
  NewAction,
  RemoveAction,
  StartAction,
} from '../actions';
import { ERROR_PREFIX } from '../lib/ui';
import { AddCommand } from './add.command';
import { BuildCommand } from './build.command';
import { GenerateCommand } from './generate.command';
import { InfoCommand } from './info.command';
import { NewCommand } from './new.command';
import { StartCommand } from './start.command';
import { RemoveCommand } from './remove.command';
export class CommandLoader {
  public static async load(program: CommanderStatic): Promise<void> {
    new NewCommand(new NewAction()).load(program);
    new RemoveCommand(new RemoveAction()).load(program);
    new BuildCommand(new BuildAction()).load(program);
    new StartCommand(new StartAction()).load(program);
    new InfoCommand(new InfoAction()).load(program);
    new AddCommand(new AddAction()).load(program);
    await new GenerateCommand(new GenerateAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}
