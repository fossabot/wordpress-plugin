// Loaded elements
$.expr.filters.loaded = element => {
    const $element = $(element);

    if ($element.is('img')) {
        return (
            element.complete ||
            element.readyState === 'complete' ||
            element.readyState === 4 ||
            element.naturalHeight !== 0
        );
    }

    if ($element.is('iframe')) {
        try {
            const document = element.contentDocument || element.contentWindow.document;
            return document.readyState === 'complete';
        } catch (e) {
            return false;
        }
    }

    return false;
};
