import { expect, test } from "vitest"
import {
	ChannelType,
	Client,
	ClientMode,
	DmChannel,
	GroupDmChannel,
	GuildAnnouncementChannel,
	GuildCategoryChannel,
	GuildTextChannel,
	GuildVoiceChannel,
	Message
} from "../../src/index.js"
import { channelFactory } from "../../src/factories/channelFactory.js"

const client = new Client(
	{
		clientId: "12345678901234567890",
		publicKey: "test-public-key",
		token: "test-token",
		mode: ClientMode.NodeJS
	},
	[]
)

test("channelFactory returns a DmChannel", () => {
	const data = {
		last_message_id: "3343820033257021450",
		type: 1,
		id: "319674150115610528",
		name: null,
		recipients: [
			{
				username: "test",
				discriminator: "9999",
				global_name: "test",
				id: "82198898841029460",
				avatar: "33ecab261d4681afa4d85a04691c4a01"
			}
		]
	}
	const dmChannel = channelFactory(client, data)!
	expect(dmChannel).toBeInstanceOf(DmChannel)
	expect(dmChannel.type).toBe(ChannelType.DM)
	expect(dmChannel.partial).toBe(false)
	expect(dmChannel.rawData).toBe(data)
	expect(dmChannel.id).toBe("319674150115610528")
	expect(dmChannel.name).toBe(null)
})

test("channelFactory returns a GroupDmChannel", () => {
	const data = {
		name: "Some test channel",
		icon: null,
		recipients: [
			{
				username: "test",
				discriminator: "9999",
				global_name: "test",
				id: "82198898841029460",
				avatar: "33ecab261d4681afa4d85a04691c4a01"
			},
			{
				username: "test2",
				discriminator: "9999",
				global_name: "test",
				id: "82198810841029460",
				avatar: "33ecab261d4681afa4d85a10691c4a01"
			}
		],
		last_message_id: "3343820033257021450",
		type: 3,
		id: "319674150115710528",
		owner_id: "82198810841029460"
	}
	const groupDmChannel = channelFactory(client, data)!
	expect(groupDmChannel).toBeInstanceOf(GroupDmChannel)
	expect(groupDmChannel.type).toBe(ChannelType.GroupDM)
	expect(groupDmChannel.partial).toBe(false)
	expect(groupDmChannel.rawData).toBe(data)
	expect(groupDmChannel.id).toBe("319674150115710528")
	expect(groupDmChannel.name).toBe("Some test channel")
})

test("channelFactory returns a GuildTextChannel", () => {
	const data = {
		id: "41771983423143937",
		guild_id: "41771983423143937",
		name: "general",
		type: 0,
		position: 6,
		permission_overwrites: [],
		rate_limit_per_user: 2,
		nsfw: true,
		last_message_id: "155117677105512449",
		parent_id: "399942396007890945",
		default_auto_archive_duration: 60,
		lastPinTimestamp: new Date().toISOString()
	}

	const guildTextChannel = channelFactory(
		client,
		data
	)! as GuildTextChannel<false>
	expect(guildTextChannel).toBeInstanceOf(GuildTextChannel)
	expect(guildTextChannel.type).toBe(ChannelType.GuildText)
	expect(guildTextChannel.partial).toBe(false)
	expect(guildTextChannel.rawData).toBe(data)
	expect(guildTextChannel.id).toBe("41771983423143937")
	expect(guildTextChannel.name).toBe("general")
	expect(guildTextChannel.guildId).toBe("41771983423143937")
	expect(guildTextChannel.position).toBe(6)
	expect(guildTextChannel.parentId).toBe("399942396007890945")
	expect(guildTextChannel.nsfw).toBe(true)
	expect(guildTextChannel.rateLimitPerUser).toBe(2)
	expect(guildTextChannel.defaultAutoArchiveDuration).toBe(60)
	expect(guildTextChannel.lastMessageId).toBe("155117677105512449")
	expect(guildTextChannel.lastMessage).toBeInstanceOf(Message)
	expect(guildTextChannel.lastMessage?.id).toBe("155117677105512449")
	expect(guildTextChannel.lastPinTimestamp).toBe(null)
})

test("channelFactory returns a GuildVoiceChannel", () => {
	const data = {
		id: "155101607195836416",
		last_message_id: "174629835082649376",
		type: 2,
		name: "ROCKET CHEESE",
		position: 5,
		parent_id: null,
		bitrate: 64000,
		user_limit: 0,
		rtc_region: null,
		guild_id: "41771983423143937",
		permission_overwrites: [],
		rate_limit_per_user: 0,
		nsfw: false
	}
	const guildVoiceChannel = channelFactory(
		client,
		data
	)! as GuildVoiceChannel<false>
	expect(guildVoiceChannel).toBeInstanceOf(GuildVoiceChannel)
	expect(guildVoiceChannel.type).toBe(ChannelType.GuildVoice)
	expect(guildVoiceChannel.partial).toBe(false)
	expect(guildVoiceChannel.rawData).toBe(data)
	expect(guildVoiceChannel.id).toBe("155101607195836416")
	expect(guildVoiceChannel.name).toBe("ROCKET CHEESE")
	expect(guildVoiceChannel.guildId).toBe("41771983423143937")
	expect(guildVoiceChannel.position).toBe(5)
	expect(guildVoiceChannel.parentId).toBe(null)
	expect(guildVoiceChannel.bitrate).toBe(64000)
	expect(guildVoiceChannel.userLimit).toBe(0)
	expect(guildVoiceChannel.rtcRegion).toBe(null)
	// TODO: add this, expect(guildVoiceChannel.rateLimitPerUser).toBe(0)
	expect(guildVoiceChannel.nsfw).toBe(false)
})

test("channelFactory returns a GuildCategoryChannel", () => {
	const data = {
		permission_overwrites: [],
		name: "Test",
		parent_id: null,
		nsfw: false,
		position: 0,
		guild_id: "290926798629997250",
		type: 4,
		id: "399942396007890945"
	}
	const guildCategoryChannel = channelFactory(
		client,
		data
	)! as GuildCategoryChannel<false>
	expect(guildCategoryChannel).toBeInstanceOf(GuildCategoryChannel)
	expect(guildCategoryChannel.type).toBe(ChannelType.GuildCategory)
	expect(guildCategoryChannel.partial).toBe(false)
	expect(guildCategoryChannel.rawData).toBe(data)
	expect(guildCategoryChannel.id).toBe("399942396007890945")
	expect(guildCategoryChannel.name).toBe("Test")
	expect(guildCategoryChannel.guildId).toBe("290926798629997250")
	expect(guildCategoryChannel.position).toBe(0)
	expect(guildCategoryChannel.parentId).toBe(null)
	expect(guildCategoryChannel.nsfw).toBe(false)
})

test("channelFactory returns a GuildAnnouncementChannel", () => {
	const data = {
		id: "41771983423143937",
		guild_id: "41771983423143937",
		name: "important-news",
		type: 5,
		position: 6,
		permission_overwrites: [],
		nsfw: true,
		topic: "Rumors about Half Life 3",
		last_message_id: "155117677105512449",
		parent_id: "399942396007890945",
		default_auto_archive_duration: 60
	}
	const guildAnnouncementChannel = channelFactory(
		client,
		data
	)! as GuildAnnouncementChannel<false>
	expect(guildAnnouncementChannel).toBeInstanceOf(GuildAnnouncementChannel)
	expect(guildAnnouncementChannel.type).toBe(ChannelType.GuildAnnouncement)
	expect(guildAnnouncementChannel.partial).toBe(false)
	expect(guildAnnouncementChannel.rawData).toBe(data)
	expect(guildAnnouncementChannel.id).toBe("41771983423143937")
	expect(guildAnnouncementChannel.name).toBe("important-news")
	expect(guildAnnouncementChannel.guildId).toBe("41771983423143937")
	expect(guildAnnouncementChannel.position).toBe(6)
	expect(guildAnnouncementChannel.parentId).toBe("399942396007890945")
	expect(guildAnnouncementChannel.nsfw).toBe(true)
	expect(guildAnnouncementChannel.lastMessageId).toBe("155117677105512449")
	expect(guildAnnouncementChannel.lastMessage).toBeInstanceOf(Message)
	expect(guildAnnouncementChannel.lastMessage?.id).toBe("155117677105512449")
})

test("channelFactory returns a GuildThreadChannel - AnnouncementThread", () => {})

test("channelFactory returns a GuildThreadChannel - PublicThread", () => {})

test("channelFactory returns a GuildThreadChannel - PrivateThread", () => {})

test("channelFactory returns a GuildForumChannel", () => {})

test("channelFactory returns a GuildMediaChannel", () => {})
