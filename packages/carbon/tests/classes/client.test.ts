import { expect, test } from "vitest"
import { Client, ClientMode } from "../../src/index.js"

test("Client", () => {
	const client = new Client(
		{
			clientId: "12345678901234567890",
			publicKey: "test-public-key",
			token: "test-token",
			redirectUrl: "https://example.com",
			mode: ClientMode.NodeJS,
			interactionRoute: "/interaction",
			port: 3135,
			autoDeploy: true,
			autoRegister: true
		},
		[]
	)

	expect(client.options.clientId).toBe("12345678901234567890")
	expect(client.options.publicKey).toBe("test-public-key")
	expect(client.options.token).toBe("test-token")
	expect(client.options.mode).toBe(ClientMode.NodeJS)
	expect(client.options.interactionRoute).toBe("/interaction")
	expect(client.options.port).toBe(3135)
	expect(client.options.autoDeploy).toBe(true)
	expect(client.options.autoRegister).toBe(true)

	expect(client.commands).toEqual([])
})
