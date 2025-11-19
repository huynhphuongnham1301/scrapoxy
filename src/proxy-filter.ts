/**
 * Proxy filtering module for Scrapoxy
 * Filters proxies by state (e.g., USA) and ASN (Autonomous System Number)
 */

export interface ProxyFingerprint {
    ip: string;
    countryCode?: string;
    state?: string;
    asnName?: string;
    asnNetwork?: string;
    asnNumber?: number;
}

export interface Proxy {
    id?: string;
    fingerprint: ProxyFingerprint;
    status?: string;
}

export interface FilterOptions {
    states?: string[];
    excludeStates?: string[];
    asns?: number[];
    excludeAsns?: number[];
    asnNames?: string[];
    excludeAsnNames?: string[];
}

/**
 * Filters proxies based on state and ASN criteria
 * @param proxies Array of proxies to filter
 * @param options Filter options including states and ASNs
 * @returns Filtered array of proxies
 */
export function filterProxies(proxies: Proxy[], options: FilterOptions): Proxy[] {
    return proxies.filter(proxy => {
        const fingerprint = proxy.fingerprint;
        
        // Filter by state (inclusion)
        if (options.states && options.states.length > 0) {
            const state = fingerprint.state || fingerprint.countryCode;
            if (!state || !options.states.some(s => s.toLowerCase() === state.toLowerCase())) {
                return false;
            }
        }
        
        // Filter by state (exclusion)
        if (options.excludeStates && options.excludeStates.length > 0) {
            const state = fingerprint.state || fingerprint.countryCode;
            if (state && options.excludeStates.some(s => s.toLowerCase() === state.toLowerCase())) {
                return false;
            }
        }
        
        // Filter by ASN number (inclusion)
        if (options.asns && options.asns.length > 0) {
            if (!fingerprint.asnNumber || !options.asns.includes(fingerprint.asnNumber)) {
                return false;
            }
        }
        
        // Filter by ASN number (exclusion)
        if (options.excludeAsns && options.excludeAsns.length > 0) {
            if (fingerprint.asnNumber && options.excludeAsns.includes(fingerprint.asnNumber)) {
                return false;
            }
        }
        
        // Filter by ASN name (inclusion)
        if (options.asnNames && options.asnNames.length > 0) {
            if (!fingerprint.asnName || !options.asnNames.some(name => 
                fingerprint.asnName!.toLowerCase().includes(name.toLowerCase())
            )) {
                return false;
            }
        }
        
        // Filter by ASN name (exclusion)
        if (options.excludeAsnNames && options.excludeAsnNames.length > 0) {
            if (fingerprint.asnName && options.excludeAsnNames.some(name => 
                fingerprint.asnName!.toLowerCase().includes(name.toLowerCase())
            )) {
                return false;
            }
        }
        
        return true;
    });
}

/**
 * Filters proxies to only include those from USA
 * @param proxies Array of proxies to filter
 * @returns Filtered array of proxies from USA
 */
export function filterUSAProxies(proxies: Proxy[]): Proxy[] {
    return filterProxies(proxies, { states: ['USA', 'US'] });
}

/**
 * Filters proxies to exclude those from specific ASNs (e.g., datacenter providers)
 * @param proxies Array of proxies to filter
 * @param asnNames Array of ASN names to exclude (e.g., ['Google LLC', 'Amazon.com'])
 * @returns Filtered array of proxies
 */
export function excludeDatacenterASNs(proxies: Proxy[], asnNames: string[]): Proxy[] {
    return filterProxies(proxies, { excludeAsnNames: asnNames });
}

/**
 * Common datacenter ASN names to filter out
 */
export const COMMON_DATACENTER_ASNS = [
    'Google LLC',
    'Amazon.com',
    'Microsoft Corporation',
    'Digital Ocean',
    'Hetzner Online GmbH',
    'OVH SAS',
    'Linode',
    'Vultr',
    'Cloudflare'
];

/**
 * Filters USA proxies and excludes common datacenter ASNs
 * @param proxies Array of proxies to filter
 * @returns Filtered array of USA proxies excluding datacenters
 */
export function filterUSAResidentialProxies(proxies: Proxy[]): Proxy[] {
    const usaProxies = filterUSAProxies(proxies);
    return excludeDatacenterASNs(usaProxies, COMMON_DATACENTER_ASNS);
}
