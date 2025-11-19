# Scrapoxy Proxy Filter Module

This module provides comprehensive filtering functionality for Scrapoxy proxies based on geographic state (e.g., USA) and ASN (Autonomous System Number).

## Overview

The proxy filter module allows you to:
- Filter proxies by state/country code
- Filter proxies by ASN (number or name)
- Exclude specific states or ASNs
- Combine multiple filtering criteria
- Identify and exclude datacenter proxies

## Features

### State-Based Filtering
- **Include**: Only proxies from specific states (e.g., USA, UK)
- **Exclude**: Remove proxies from specific states
- **Case-insensitive**: Matching works regardless of case

### ASN-Based Filtering
- **ASN Number**: Filter by exact ASN numbers
- **ASN Name**: Filter by ASN name (partial matching supported)
- **Datacenter Detection**: Built-in list of common datacenter ASNs
- **Residential Filtering**: Easily filter for residential IPs by excluding datacenters

### Combined Filtering
- Apply multiple criteria simultaneously
- Both inclusion and exclusion filters
- Flexible and composable

## Implementation Details

### Data Structure

```typescript
interface ProxyFingerprint {
    ip: string;
    countryCode?: string;
    state?: string;
    asnName?: string;
    asnNetwork?: string;
    asnNumber?: number;
}

interface Proxy {
    id?: string;
    fingerprint: ProxyFingerprint;
    status?: string;
}
```

### Filter Options

```typescript
interface FilterOptions {
    states?: string[];          // Include only these states
    excludeStates?: string[];   // Exclude these states
    asns?: number[];            // Include only these ASN numbers
    excludeAsns?: number[];     // Exclude these ASN numbers
    asnNames?: string[];        // Include only these ASN names (partial match)
    excludeAsnNames?: string[]; // Exclude these ASN names (partial match)
}
```

## Functions

### `filterProxies(proxies, options)`
Main filtering function that applies all specified criteria.

### `filterUSAProxies(proxies)`
Convenience function to filter only USA proxies.

### `excludeDatacenterASNs(proxies, asnNames)`
Exclude proxies from specific datacenter ASNs.

### `filterUSAResidentialProxies(proxies)`
Filter for USA residential proxies (excludes common datacenters).

## Common Datacenter ASNs

The module includes a predefined list of common datacenter providers:
- Google LLC
- Amazon.com
- Microsoft Corporation
- Digital Ocean
- Hetzner Online GmbH
- OVH SAS
- Linode
- Vultr
- Cloudflare

## Testing

The module includes comprehensive unit tests covering:
- State filtering (inclusion and exclusion)
- ASN filtering (by number and name)
- Combined filter criteria
- Edge cases (empty arrays, missing data, case sensitivity)
- 100% code coverage

Run tests with:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

## Building

Build the TypeScript code to JavaScript:
```bash
npm run build
```

This generates:
- `dist/proxy-filter.js` - Compiled JavaScript
- `dist/proxy-filter.d.ts` - TypeScript type definitions

## Integration with Scrapoxy

This module is designed to work with Scrapoxy's proxy data format. It expects proxies to have a `fingerprint` object containing geographic and ASN information, which is the standard format returned by Scrapoxy's API.

See [EXAMPLES.md](../EXAMPLES.md) for detailed usage examples.
