# Scrapoxy Proxy Filter

This repository contains a **proxy filtering module** for Scrapoxy that allows you to filter proxies by:
- **State/Country** (e.g., USA, UK, Canada)
- **ASN (Autonomous System Number)** - both by number and name
- **Datacenter detection** - identify and exclude datacenter IPs

## 🎯 Features

- ✅ Filter proxies by state (USA) with case-insensitive matching
- ✅ Filter proxies by ASN number or ASN name
- ✅ Exclude specific states or ASNs
- ✅ Built-in list of common datacenter ASNs for filtering residential proxies
- ✅ Combine multiple filter criteria
- ✅ TypeScript support with full type definitions
- ✅ 100% test coverage

## 📦 Installation

```bash
npm install
npm run build
```

## 🚀 Quick Start

```javascript
const { filterUSAProxies, filterUSAResidentialProxies } = require('./dist/proxy-filter');

// Get only USA proxies
const usaProxies = filterUSAProxies(proxies);

// Get USA residential proxies (excludes datacenters)
const residential = filterUSAResidentialProxies(proxies);
```

## 📖 Documentation

- [EXAMPLES.md](EXAMPLES.md) - Detailed usage examples
- [src/README.md](src/README.md) - Implementation details
- [src/proxy-filter.ts](src/proxy-filter.ts) - Source code with JSDoc

## 🧪 Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

## 💡 Example Usage

Run the included example script:

```bash
npm run build
node examples.js
```

This demonstrates filtering by:
- State (USA)
- ASN (exclude datacenters)
- Specific ASN numbers
- Combined criteria

## 🔗 About Scrapoxy

Scrapoxy is a **super proxies manager** that orchestrates all your proxies into **one place 🎯**,
rather than spreading management across multiple scrapers 🕸️.

Deployed on your own infrastructure, Scrapoxy serves as a **single proxy endpoint** for your scrapers.

It creates a pool of private proxies from your datacenter subscription 🔒,
integrates them with proxy vendors 🔌, handles IP rotation and fingerprinting,
and smartly routes traffic to **avoid bans** 🚫.

<br/>

![Scrapoxy](https://raw.githubusercontent.com/scrapoxy/scrapoxy/master/packages/website/public/assets/images/scrapoxy.gif)

**🚀🚀 [MORE INFO AT SCRAPOXY.IO](https://scrapoxy.io)🚀🚀**


## Features

### ☁️ Datacenter Providers with easy installation ☁️

Scrapoxy supports many datacenter providers like [AWS](https://scrapoxy.io/l/aws), [Azure](https://scrapoxy.io/l/azure), or [GCP](https://scrapoxy.io/l/gcp).

It installs a proxy image on each datacenter, helping the quick launch of a proxy instance.
Traffic is routed to proxy instances to provide many IP addresses.

Scrapoxy handles the startup/shutdown of proxy instances to rotate IP addresses effectively.


### 🌐 Proxy Services 🌐

Scrapoxy supports many proxy services like [Rayobyte](https://scrapoxy.io/l/rayobyte), [IPRoyal](https://scrapoxy.io/l/iproyal) or [Zyte](https://scrapoxy.io/l/zyte).

It connects to these services and uses a variety of parameters such as country or OS type,
to create a diversity of proxies.


### 💻 Hardware materials 💻

Scrapoxy supports many 4G proxy farms hardware types like [Proxidize](https://scrapoxy.io/l/proxidize).

It uses their APIs to handle IP rotation on 4G networks.


### 📜 Free Proxy Lists 📜

Scrapoxy supports lists of HTTP/HTTPS proxies and SOCKS4/SOCKS5 proxies.

It takes care of testing their connectivity to aggregate them into the proxy pool.


### ⏰ Timeout free ⏰

Scrapoxy only routes traffic to online proxies.

This feature is useful with residential proxies.
Sometimes, proxies may be too slow or inactive.
Scrapoxy detects these offline nodes and excludes them from the proxy pool.


### 🔄 Auto-Rotate proxies 🔄

Scrapoxy automatically changes IP addresses at regular intervals.

Scrapers can have thousands of IP addresses without managing proxy rotation.


### 🏃 Auto-Scale proxies 🏃

Scrapoxy monitors incoming traffic
and automatically scales the number of proxies according to your needs.

It also reduces proxy count to minimize your costs.


### 🍪 Sticky sessions on Browser 🍪

Scrapoxy can keep the same IP address for a scraping session, even for browsers.

It includes HTTP requests/responses interception mechanism to inject a session cookie,
ensuring continuity of the IP address throughout the browser session.


### 🚨 Ban management 🚨

Scrapoxy injects the name of the proxy into the HTTP responses.

When a scraper detects that a ban has occurred, it can notify Scrapoxy to remove the proxy from the pool.


### 📡 Traffic interception 📡

Scrapoxy intercepts HTTP requests/responses to modify headers,
keeping consistency in your scraping stack.
It can add session cookies or specific headers like user-agent.


###  📊 Traffic monitoring 📊

Scrapoxy measures incoming and outgoing traffic to provide an overview of your scraping session.

It tracks metrics such as the number of requests, active proxy count, requests per proxy, and more.


### 🌍 Coverage monitoring 🌍

Scrapoxy displays the geographic coverage of your proxies to better understand the global distribution of your proxies.


### 🚀 Easy-to-use and production-ready 🚀

Scrapoxy is suitable for both beginners and experts.

It can be started in seconds using Docker, or be deployed in a complex, distributed environment with Kubernetes.


### 🔓 Free 🔓

Scrapoxy is free, only pay for support.


## Documentation

More information on [scrapoxy.io](https://scrapoxy.io).


## Follow-up

[![Discord](https://img.shields.io/discord/1095676356496461934?logo=discord&label=Discord&color=7289da&style=flat-square)](https://scrapoxy.io/l/discord-scrapoxy)
[![Docker](https://img.shields.io/docker/v/scrapoxy/scrapoxy?logo=docker&label=Docker&style=flat-square)](https://scrapoxy.io/l/docker-scrapoxy)

[![Star History Chart](https://api.star-history.com/svg?repos=scrapoxy/scrapoxy&type=Timeline)](https://scrapoxy.io/l/star-history)
