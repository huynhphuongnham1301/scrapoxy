# Proxy Filter Examples

This module provides filtering functionality for Scrapoxy proxies based on state (e.g., USA) and ASN (Autonomous System Number).

## Installation

```bash
npm install
npm run build
```

## Usage Examples

### Basic Filtering

```typescript
import {
    filterProxies,
    filterUSAProxies,
    excludeDatacenterASNs,
    filterUSAResidentialProxies,
    Proxy
} from './proxy-filter';

// Sample proxy data
const proxies: Proxy[] = [
    {
        id: '1',
        fingerprint: {
            ip: '203.0.113.1',
            countryCode: 'US',
            state: 'USA',
            asnName: 'Comcast Cable',
            asnNumber: 7922
        },
        status: 'STARTED'
    },
    {
        id: '2',
        fingerprint: {
            ip: '198.51.100.1',
            countryCode: 'US',
            state: 'USA',
            asnName: 'Google LLC',
            asnNumber: 15169
        },
        status: 'STARTED'
    }
];
```

### Filter by State (USA)

```typescript
// Get only USA proxies
const usaProxies = filterUSAProxies(proxies);
console.log(`Found ${usaProxies.length} USA proxies`);
```

### Filter by ASN

```typescript
// Exclude specific ASN numbers
const filtered = filterProxies(proxies, {
    excludeAsns: [15169, 16509] // Exclude Google and Amazon
});

// Exclude specific ASN names
const noDatacenters = filterProxies(proxies, {
    excludeAsnNames: ['Google LLC', 'Amazon.com']
});
```

### Combined Filtering

```typescript
// Get USA proxies, excluding datacenter ASNs
const residentialUSA = filterUSAResidentialProxies(proxies);
console.log(`Found ${residentialUSA.length} residential USA proxies`);

// Custom filtering
const customFiltered = filterProxies(proxies, {
    states: ['USA', 'US'],
    excludeAsnNames: ['Google', 'Amazon', 'Cloudflare']
});
```

### Integration with Scrapoxy API

```typescript
import axios from 'axios';
import { filterUSAResidentialProxies } from './proxy-filter';

async function getFilteredProxies() {
    // Fetch proxies from Scrapoxy API
    const response = await axios.get('http://localhost:8890/api/proxies', {
        auth: {
            username: 'admin',
            password: 'password'
        }
    });

    // Filter for USA residential proxies
    const filtered = filterUSAResidentialProxies(response.data.proxies);
    
    console.log(`Total proxies: ${response.data.proxies.length}`);
    console.log(`Filtered USA residential proxies: ${filtered.length}`);
    
    return filtered;
}
```

### Advanced Filtering Options

```typescript
// Only include specific ASNs
const specificASNs = filterProxies(proxies, {
    asns: [7922, 20057] // Only Comcast and ATT
});

// Exclude multiple states
const nonUS = filterProxies(proxies, {
    excludeStates: ['USA', 'US', 'CA']
});

// Complex multi-criteria filtering
const complex = filterProxies(proxies, {
    states: ['USA', 'US'], // Only USA
    excludeAsnNames: ['Google', 'Amazon', 'Microsoft'], // No big datacenters
    asns: [7922, 20057, 701] // Only specific ISPs
});
```

## Filter Options

The `filterProxies` function accepts the following options:

- `states`: Array of state/country codes to include (case-insensitive)
- `excludeStates`: Array of state/country codes to exclude (case-insensitive)
- `asns`: Array of ASN numbers to include
- `excludeAsns`: Array of ASN numbers to exclude
- `asnNames`: Array of ASN names to include (partial match, case-insensitive)
- `excludeAsnNames`: Array of ASN names to exclude (partial match, case-insensitive)

## Common Datacenter ASNs

The module includes a predefined list of common datacenter ASN names that can be filtered out:

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

```bash
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Building

```bash
npm run build  # Compile TypeScript to JavaScript
```
