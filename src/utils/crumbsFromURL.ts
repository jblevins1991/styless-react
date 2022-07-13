export type Crumb = {
    label: string;
    uri: string;
}

const crumbsFromURI = (uri: string, crumbIndex = 0): Crumb[] => {
    const homeCrumb = {
        label: 'Home',
        uri: '/'
    };

    const uriParts = uri.split('/');

    const nextCrumbIndex = crumbIndex + 1;

    if (
        crumbIndex < uriParts.length &&
        crumbIndex > 0
    ) {
        const nextCrumb = crumbsFromURI(uri, nextCrumbIndex);

        const currentCrumb = {
            label: uriParts[crumbIndex][0].toUpperCase() + uriParts[crumbIndex].substring(1),
            uri: uriParts.filter((_: string, index: number) => index <= crumbIndex).join('/')
        };

        return [
            currentCrumb,
            ...nextCrumb
        ];
    }
    else if (crumbIndex === 0) {
        const nextCrumb = crumbsFromURI(uri, nextCrumbIndex);

        return [
            homeCrumb,
            ...nextCrumb
        ];
    } else {
        const currentCrumb = {
            label: 'Home',
            uri: '/'
        };

        return [ currentCrumb ];
    }
}

export default crumbsFromURI;