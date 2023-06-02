---
label: Terminology
slug: en/guides/nostr/getting-started/terminology
order: 20
---

# Terminology

There are a few terms that are used throughout this guide that may be unfamiliar to you. This section will define those terms and explain how they are used in the context for Nostr. You can refer back to this section as needed as a reference.

- **NIP** - A NIP is a Nostr Implementation Possibility. NIPs are used to propose new features and improvements to the protocol and to document what may be implemented by clients and relays. All of the NIPs are documented at the following [repo](https://github.com/nostr-protocol/nips).

- **client** - A client is a program that connects to the Nostr network. A client can be used to create, read, update, and delete data on the network. A client can also be used to interact with other clients on the network. A client can be a command line application, a web application, or a mobile application.

- **relay** - A relay is like a database for the Nostr network. A relay transmits information and may or may not store it as well. Anyone can run a relay which allows the network to remain decentralized. Relays are expected to implement all required NIPs and may implement optional ones as the provider sees fit.

- **private key** - A private key is a secret 32-bytes lowercase hex-encoded number that allows you to sign transactions on the Nostr network. A private key is used to generate a public key. A private key should be kept secret and should never be shared with anyone.

- **public key** - A public key is a 32-bytes lowercase hex-encoded number that is derived from a private key. A public key is used to verify that a transaction was signed by the private key that it was derived from. A public key can be shared with anyone.
