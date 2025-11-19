#!/usr/bin/env node

/**
 * Example script demonstrating proxy filtering
 * 
 * This script shows how to use the proxy filter module to filter
 * Scrapoxy proxies by state (USA) and ASN.
 */

const {
    filterProxies,
    filterUSAProxies,
    excludeDatacenterASNs,
    filterUSAResidentialProxies,
    COMMON_DATACENTER_ASNS
} = require('./dist/proxy-filter');

// Sample proxy data that might come from Scrapoxy API
const sampleProxies = [
    {
        id: 'proxy-1',
        fingerprint: {
            ip: '203.0.113.1',
            countryCode: 'US',
            state: 'USA',
            asnName: 'Comcast Cable Communications',
            asnNetwork: '203.0.113.0/24',
            asnNumber: 7922
        },
        status: 'STARTED'
    },
    {
        id: 'proxy-2',
        fingerprint: {
            ip: '198.51.100.1',
            countryCode: 'US',
            state: 'USA',
            asnName: 'Google LLC',
            asnNetwork: '198.51.100.0/24',
            asnNumber: 15169
        },
        status: 'STARTED'
    },
    {
        id: 'proxy-3',
        fingerprint: {
            ip: '192.0.2.1',
            countryCode: 'GB',
            state: 'UK',
            asnName: 'British Telecom',
            asnNetwork: '192.0.2.0/24',
            asnNumber: 2856
        },
        status: 'STARTED'
    },
    {
        id: 'proxy-4',
        fingerprint: {
            ip: '198.18.0.1',
            countryCode: 'US',
            state: 'USA',
            asnName: 'AT&T Services',
            asnNetwork: '198.18.0.0/24',
            asnNumber: 7018
        },
        status: 'STARTED'
    },
    {
        id: 'proxy-5',
        fingerprint: {
            ip: '203.0.114.1',
            countryCode: 'US',
            state: 'USA',
            asnName: 'Amazon.com, Inc.',
            asnNetwork: '203.0.114.0/24',
            asnNumber: 16509
        },
        status: 'STARTED'
    }
];

console.log('=== Proxy Filter Examples ===\n');

console.log('Total proxies:', sampleProxies.length);
console.log('Proxies:', sampleProxies.map(p => `${p.id} (${p.fingerprint.ip} - ${p.fingerprint.asnName})`).join('\n         '));
console.log('');

// Example 1: Filter USA proxies
console.log('1. Filter USA proxies:');
const usaProxies = filterUSAProxies(sampleProxies);
console.log(`   Found ${usaProxies.length} USA proxies`);
usaProxies.forEach(p => {
    console.log(`   - ${p.id}: ${p.fingerprint.ip} (${p.fingerprint.asnName})`);
});
console.log('');

// Example 2: Filter USA residential proxies (exclude datacenters)
console.log('2. Filter USA residential proxies (exclude datacenters):');
const usaResidential = filterUSAResidentialProxies(sampleProxies);
console.log(`   Found ${usaResidential.length} USA residential proxies`);
usaResidential.forEach(p => {
    console.log(`   - ${p.id}: ${p.fingerprint.ip} (${p.fingerprint.asnName})`);
});
console.log('');

// Example 3: Exclude specific ASNs
console.log('3. Exclude Google and Amazon ASNs:');
const noCloudProviders = filterProxies(sampleProxies, {
    excludeAsnNames: ['Google', 'Amazon']
});
console.log(`   Found ${noCloudProviders.length} proxies (excluding Google & Amazon)`);
noCloudProviders.forEach(p => {
    console.log(`   - ${p.id}: ${p.fingerprint.ip} (${p.fingerprint.asnName})`);
});
console.log('');

// Example 4: Filter by specific ASN numbers
console.log('4. Filter by specific ASN numbers (Comcast & AT&T):');
const specificASNs = filterProxies(sampleProxies, {
    asns: [7922, 7018] // Comcast and AT&T
});
console.log(`   Found ${specificASNs.length} proxies from Comcast & AT&T`);
specificASNs.forEach(p => {
    console.log(`   - ${p.id}: ${p.fingerprint.ip} (${p.fingerprint.asnName}, ASN: ${p.fingerprint.asnNumber})`);
});
console.log('');

// Example 5: Combined filtering
console.log('5. Combined filtering (USA, exclude datacenters, specific ISPs):');
const combined = filterProxies(sampleProxies, {
    states: ['USA', 'US'],
    excludeAsnNames: COMMON_DATACENTER_ASNS,
    asns: [7922, 7018, 20057] // Comcast, AT&T, and Verizon
});
console.log(`   Found ${combined.length} proxies matching all criteria`);
combined.forEach(p => {
    console.log(`   - ${p.id}: ${p.fingerprint.ip} (${p.fingerprint.asnName})`);
});
console.log('');

// Example 6: Exclude USA proxies
console.log('6. Exclude USA proxies (get international):');
const international = filterProxies(sampleProxies, {
    excludeStates: ['USA', 'US']
});
console.log(`   Found ${international.length} international proxies`);
international.forEach(p => {
    console.log(`   - ${p.id}: ${p.fingerprint.ip} (${p.fingerprint.countryCode} - ${p.fingerprint.asnName})`);
});
console.log('');

console.log('=== Examples Complete ===');
