/*---------------------------------------------------------
 * Copyright 2022 The Go Authors. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import { Range } from 'vscode';

import { CommandFactory } from '.';
import { GoExtensionContext } from '../context';

export const gotoLocation: CommandFactory = (_: unknown, goCtx: GoExtensionContext) => {
	return async (args) => {
		const { languageClient } = goCtx;
		if (languageClient === undefined) return;

		type Args = { filename: string; range: Range };
		const { filename, range: protoRange }: Args = args;

		const url = languageClient.protocol2CodeConverter.asUri(filename);
		const range = new vscode.Range(
			new vscode.Position(protoRange.start.line - 1, protoRange.start.character - 1),
			new vscode.Position(protoRange.start.line - 1, protoRange.start.character - 1)
		);

		await vscode.window.showTextDocument(url, { selection: range });
	};
};
