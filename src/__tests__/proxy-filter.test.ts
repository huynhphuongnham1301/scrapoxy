import {
    filterProxies,
    filterUSAProxies,
    excludeDatacenterASNs,
    filterUSAResidentialProxies,
    COMMON_DATACENTER_ASNS,
    Proxy
} from '../proxy-filter';

describe('Proxy Filter', () => {
    const sampleProxies: Proxy[] = [
        {
            id: '1',
            fingerprint: {
                ip: '203.0.113.1',
                countryCode: 'US',
                state: 'USA',
                asnName: 'Comcast Cable',
                asnNetwork: '203.0.113.0/24',
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
                asnNetwork: '198.51.100.0/24',
                asnNumber: 15169
            },
            status: 'STARTED'
        },
        {
            id: '3',
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
            id: '4',
            fingerprint: {
                ip: '198.18.0.1',
                countryCode: 'US',
                state: 'USA',
                asnName: 'Amazon.com',
                asnNetwork: '198.18.0.0/24',
                asnNumber: 16509
            },
            status: 'STARTED'
        },
        {
            id: '5',
            fingerprint: {
                ip: '203.0.114.1',
                countryCode: 'CA',
                state: 'Canada',
                asnName: 'Rogers Communications',
                asnNetwork: '203.0.114.0/24',
                asnNumber: 812
            },
            status: 'STARTED'
        }
    ];

    describe('filterProxies', () => {
        it('should filter proxies by state (USA)', () => {
            const result = filterProxies(sampleProxies, { states: ['USA', 'US'] });
            expect(result).toHaveLength(3);
            expect(result.every(p => p.fingerprint.state === 'USA' || p.fingerprint.countryCode === 'US')).toBe(true);
        });

        it('should exclude proxies by state', () => {
            const result = filterProxies(sampleProxies, { excludeStates: ['USA', 'US'] });
            expect(result).toHaveLength(2);
            expect(result.every(p => p.fingerprint.state !== 'USA' && p.fingerprint.countryCode !== 'US')).toBe(true);
        });

        it('should filter proxies by ASN number', () => {
            const result = filterProxies(sampleProxies, { asns: [7922, 2856] });
            expect(result).toHaveLength(2);
            expect(result.map(p => p.id)).toEqual(['1', '3']);
        });

        it('should exclude proxies by ASN number', () => {
            const result = filterProxies(sampleProxies, { excludeAsns: [15169, 16509] });
            expect(result).toHaveLength(3);
            expect(result.every(p => p.fingerprint.asnNumber !== 15169 && p.fingerprint.asnNumber !== 16509)).toBe(true);
        });

        it('should filter proxies by ASN name', () => {
            const result = filterProxies(sampleProxies, { asnNames: ['Google'] });
            expect(result).toHaveLength(1);
            expect(result[0].fingerprint.asnName).toContain('Google');
        });

        it('should exclude proxies by ASN name', () => {
            const result = filterProxies(sampleProxies, { excludeAsnNames: ['Google', 'Amazon'] });
            expect(result).toHaveLength(3);
            expect(result.every(p => !p.fingerprint.asnName?.includes('Google') && !p.fingerprint.asnName?.includes('Amazon'))).toBe(true);
        });

        it('should handle multiple filter criteria', () => {
            const result = filterProxies(sampleProxies, {
                states: ['USA', 'US'],
                excludeAsnNames: ['Google']
            });
            expect(result).toHaveLength(2);
            expect(result.every(p => 
                (p.fingerprint.state === 'USA' || p.fingerprint.countryCode === 'US') &&
                !p.fingerprint.asnName?.includes('Google')
            )).toBe(true);
        });

        it('should return all proxies when no filters are specified', () => {
            const result = filterProxies(sampleProxies, {});
            expect(result).toHaveLength(5);
        });
    });

    describe('filterUSAProxies', () => {
        it('should filter only USA proxies', () => {
            const result = filterUSAProxies(sampleProxies);
            expect(result).toHaveLength(3);
            expect(result.every(p => p.fingerprint.state === 'USA' || p.fingerprint.countryCode === 'US')).toBe(true);
        });

        it('should return empty array when no USA proxies exist', () => {
            const nonUSProxies = sampleProxies.filter(p => p.fingerprint.countryCode !== 'US');
            const result = filterUSAProxies(nonUSProxies);
            expect(result).toHaveLength(0);
        });
    });

    describe('excludeDatacenterASNs', () => {
        it('should exclude specified datacenter ASNs', () => {
            const result = excludeDatacenterASNs(sampleProxies, ['Google LLC', 'Amazon.com']);
            expect(result).toHaveLength(3);
            expect(result.every(p => p.fingerprint.asnName !== 'Google LLC' && p.fingerprint.asnName !== 'Amazon.com')).toBe(true);
        });

        it('should return all proxies when no ASN matches', () => {
            const result = excludeDatacenterASNs(sampleProxies, ['Nonexistent ASN']);
            expect(result).toHaveLength(5);
        });
    });

    describe('filterUSAResidentialProxies', () => {
        it('should filter USA proxies and exclude common datacenters', () => {
            const result = filterUSAResidentialProxies(sampleProxies);
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('1');
            expect(result[0].fingerprint.state).toBe('USA');
            expect(COMMON_DATACENTER_ASNS.every(asn => !result[0].fingerprint.asnName?.includes(asn))).toBe(true);
        });

        it('should return empty array when all USA proxies are from datacenters', () => {
            const datacenterProxies = sampleProxies.filter(p => 
                p.fingerprint.asnName === 'Google LLC' || p.fingerprint.asnName === 'Amazon.com'
            );
            const result = filterUSAResidentialProxies(datacenterProxies);
            expect(result).toHaveLength(0);
        });
    });

    describe('Edge cases', () => {
        it('should handle empty proxy array', () => {
            const result = filterProxies([], { states: ['USA'] });
            expect(result).toHaveLength(0);
        });

        it('should handle proxies without fingerprint data', () => {
            const incompleteProxies: Proxy[] = [
                {
                    fingerprint: { ip: '1.2.3.4' }
                }
            ];
            const result = filterProxies(incompleteProxies, { states: ['USA'] });
            expect(result).toHaveLength(0);
        });

        it('should be case-insensitive for state filtering', () => {
            const result = filterProxies(sampleProxies, { states: ['usa', 'us'] });
            expect(result).toHaveLength(3);
        });

        it('should be case-insensitive for ASN name filtering', () => {
            const result = filterProxies(sampleProxies, { asnNames: ['google'] });
            expect(result).toHaveLength(1);
        });
    });
});
