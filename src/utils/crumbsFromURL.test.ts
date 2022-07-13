import crumbsFromURI, { Crumb } from './crumbsFromURL';


describe('crumbsFromURL utility', () => {
    it('should return "Home"', () => {
        const breadcrumbs: Crumb[] = crumbsFromURI('/');

        expect(breadcrumbs).toEqual([
            {
                label: 'Home',
                uri: '/'
            }
        ]);
    });

    it('should return "Home" and "Blog"', () => {
        const breadcrumbs: Crumb[] = crumbsFromURI('/blog');
    })
})