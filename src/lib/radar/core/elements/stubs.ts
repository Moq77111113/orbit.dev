import { randomInteger } from "$lib/utils/random.js";
import type { Entry } from "./types/entry.js";
import type { Radar } from "./types/radar.js";
import type { Ring } from "./types/ring.js";
import type { Section } from "./types/section.js";

export const sections = [
	{
		id: "sec-languages",
		name: "Languages",
	},
	{
		id: "sec-frameworks",
		name: "Frameworks",
	},
	{
		id: "sec-tools",
		name: "Tools",
	},
	{
		id: "sec-platforms",
		name: "Platforms",
	},
] satisfies Section[];

export const rings = [
	{
		id: "rng-adopt",
		name: "Adopt",

		color: "#00C853",
	},
	{
		id: "rng-trial",
		name: "Trial",
		color: "#00B8D9",
	},
	{
		id: "rng-assess",
		name: "Assess",
		color: "#FFAB00",
	},
	{
		id: "rng-hold",
		name: "Hold",
		color: "#FF5630",
	},
] satisfies Ring[];

export const entries = [
	{
		id: "ent-typescript",
		name: "TypeScript",
		sectionId: "sec-languages",
		description:
			"A typed superset of JavaScript that compiles to plain JavaScript.",
	},
	{
		id: "ent-react",
		name: "React",
		sectionId: "sec-frameworks",
		description: "A JavaScript library for building user interfaces.",
	},
	{
		id: "ent-svelte",
		name: "Svelte",
		sectionId: "sec-frameworks",
		description:
			"A component framework that compiles to highly efficient vanilla JavaScript.",
	},
	{
		id: "ent-vue",
		name: "Vue.js",
		sectionId: "sec-frameworks",
		description: "A progressive framework for building user interfaces",
	},
	{
		id: "ent-figma",
		name: "Figma",
		sectionId: "sec-tools",
		description: "A vector graphics editor and prototyping tool.",
	},
	{
		id: "ent-zeplin",
		name: "Zeplin",
		sectionId: "sec-tools",
		description: "A collaboration tool for designers and developers.",
	},
	{
		id: "ent-netlify",
		name: "Netlify",
		sectionId: "sec-platforms",
		description: "An all-in-one platform for automating modern web projects.",
	},
	{
		id: "ent-vercel",
		name: "Vercel",
		sectionId: "sec-platforms",
		description: "A cloud platform for static sites and serverless functions.",
	},
	{
		id: "ent-angular",
		name: "Angular",
		sectionId: "sec-frameworks",
		description:
			"A platform and framework for building single-page client applications using HTML and TypeScript.",
	},
	{
		id: "ent-sass",
		name: "Sass",
		sectionId: "sec-languages",
		description:
			"A CSS extension language that adds power and elegance to the basic language.",
	},
	{
		id: "ent-css",
		name: "CSS",
		sectionId: "sec-languages",
		description:
			"A stylesheet language that describes the presentation of an HTML document.",
	},
	{
		id: "ent-html",
		name: "HTML",
		sectionId: "sec-languages",
		description:
			"A markup language that defines the structure of your content.",
	},
	{
		id: "ent-javascript",
		name: "JavaScript",
		sectionId: "sec-languages",
		description:
			"A programming language that conforms to the ECMAScript specification.",
	},
	{
		id: "ent-nodejs",
		name: "Node.js",
		sectionId: "sec-platforms",
		description: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
	},
	{
		id: "ent-docker",
		name: "Docker",
		sectionId: "sec-tools",
		description:
			"A platform for building, sharing, and running applications with containers.",
	},
	{
		id: "ent-graphql",
		name: "GraphQL",
		sectionId: "sec-tools",
		description:
			"A query language for APIs and a runtime for executing those queries.",
	},
	{
		id: "ent-mongodb",
		name: "MongoDB",
		sectionId: "sec-platforms",
		description:
			"A general-purpose, document-based, distributed database built for modern application developers.",
	},
	{
		id: "ent-postgresql",
		name: "PostgreSQL",
		sectionId: "sec-platforms",
		description: "A powerful, open-source object-relational database system.",
	},
	{
		id: "ent-redis",
		name: "Redis",
		sectionId: "sec-platforms",
		description:
			"An open-source, in-memory data structure store, used as a database, cache, and message broker.",
	},
	{
		id: "ent-rust",
		name: "Rust",
		sectionId: "sec-languages",
		description:
			"A systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.",
	},
	{
		id: "ent-go",
		name: "Go",
		sectionId: "sec-languages",
		description:
			"An open-source programming language that makes it easy to build simple, reliable, and efficient software.",
	},
	{
		id: "ent-python",
		name: "Python",
		sectionId: "sec-languages",
		description:
			"An interpreted, high-level, general-purpose programming language.",
	},
	{
		id: "ent-java",
		name: "Java",
		sectionId: "sec-languages",
		description:
			"A class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.",
	},
	{
		id: "ent-kotlin",
		name: "Kotlin",
		sectionId: "sec-languages",
		description:
			"A statically typed programming language that runs on the Java Virtual Machine.",
	},
	{
		id: "ent-flutter",
		name: "Flutter",
		sectionId: "sec-frameworks",
		description:
			"An open-source UI software development kit created by Google.",
	},
	{
		id: "ent-swift",
		name: "Swift",
		sectionId: "sec-languages",
		description:
			"A powerful and intuitive programming language for macOS, iOS, watchOS, and tvOS.",
	},
	{
		id: "ent-ionic",
		name: "Ionic",
		sectionId: "sec-frameworks",
		description:
			"A complete open-source SDK for hybrid mobile app development.",
	},
	{
		id: "ent-cordova",
		name: "Apache Cordova",
		sectionId: "sec-frameworks",
		description:
			"A mobile application development framework that enables developers to build applications for mobile devices using CSS3, HTML5, and JavaScript.",
	},
	{
		id: "ent-xamarin",
		name: "Xamarin",
		sectionId: "sec-frameworks",
		description:
			"An open-source platform for building modern and performant applications for iOS, Android, and Windows with .NET.",
	},
	{
		id: "ent-aws",
		name: "Amazon Web Services",
		sectionId: "sec-platforms",
		description:
			"A secure cloud services platform, offering compute power, database storage, content delivery, and other functionality to help businesses scale and grow.",
	},
	{
		id: "ent-azure",
		name: "Microsoft Azure",
		sectionId: "sec-platforms",
		description:
			"A cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services",
	},
	{
		id: "ent-gcp",
		name: "Google Cloud Platform",
		sectionId: "sec-platforms",
		description:
			"A suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, file storage, and YouTube.",
	},
	{
		id: "ent-heroku",
		name: "Heroku",
		sectionId: "sec-platforms",
		description:
			"A platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.",
	},
	{
		id: "ent-kubernetes",
		name: "Kubernetes",
		sectionId: "sec-tools",
		description:
			"An open-source container-orchestration system for automating application deployment, scaling, and management.",
	},
	{
		id: "ent-jenkins",
		name: "Jenkins",
		sectionId: "sec-tools",
		description:
			"An open-source automation server that helps to automate the parts of software development related to building, testing, and delivering, facilitating continuous integration and continuous delivery.",
	},
	{
		id: "ent-gitlab",
		name: "GitLab",
		sectionId: "sec-tools",
		description:
			"A web-based DevOps lifecycle tool that provides a Git repository manager providing wiki, issue-tracking, and CI/CD pipeline features, using an open-source license.",
	},
	{
		id: "ent-jira",
		name: "Jira",
		sectionId: "sec-tools",
		description:
			"A proprietary issue tracking product developed by Atlassian that allows bug tracking, issue tracking, and project management functions.",
	},
	{
		id: "ent-confluence",
		name: "Confluence",
		sectionId: "sec-tools",
		description:
			"A collaboration wiki tool used to help teams collaborate and share knowledge efficiently.",
	},
	{
		id: "ent-slack",
		name: "Slack",
		sectionId: "sec-tools",
		description:
			"A proprietary business communication platform developed by Slack Technologies that offers many IRC-style features, including persistent chat rooms (channels) organized by topic, private groups, and direct messaging.",
	},
	{
		id: "ent-msteams",
		name: "Microsoft Teams",
		sectionId: "sec-tools",
		description: "A proprietary business communication platform",
	},
] satisfies Omit<Entry, "ringId">[];

const createBase = <T extends "ring" | "entry" | "section">(type: T) => {
	return {
		type,
		seed: randomInteger(),
		version: 0,
		isDeleted: false,
		updated: Date.now(),
	};
};

export function createRandomRadar() {
	const enrichedEntries = entries
		.slice(0, Math.floor(Math.random() * 10) + 20)
		.map((entry) => {
			const ringId = rings[Math.floor(Math.random() * rings.length)].id;
			const isNew = Math.random() > 0.8;

			const moved = (Math.floor(Math.random() * 3) - 1) as -1 | 0 | 1;

			return { ...entry, ringId, isNew, moved, ...createBase("entry") };
		}) satisfies Entry[];

	return {
		sections: sections.map((section) => ({
			...section,
			...createBase("section"),
		})),
		rings: rings.map((ring) => ({ ...ring, ...createBase("ring") })),
		entries: enrichedEntries,
	} satisfies Radar;
}
