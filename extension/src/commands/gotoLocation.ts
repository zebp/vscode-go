/*---------------------------------------------------------
 * Copyright 2022 The Go Authors. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import { Position } from 'vscode';

import { CommandFactory } from '.';
import { GoExtensionContext } from '../context';

export const gotoLocation: CommandFactory = (_: unknown, goCtx: GoExtensionContext) => {
	return async (args) => {
		const { languageClient } = goCtx;
		if (languageClient === undefined) return;

		type Args = { filename: string; position: Position };
		const { filename, position }: Args = args;

		const url = languageClient.protocol2CodeConverter.asUri(filename);
		const range = new vscode.Range(
			new vscode.Position(position.line, position.character),
			new vscode.Position(position.line, position.character)
		);

		await vscode.window.showTextDocument(url, { selection: range });
	};
};
