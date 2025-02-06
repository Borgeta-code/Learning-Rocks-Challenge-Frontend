import Player from '@/components/Player.vue';
import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

describe('Player.vue', () => {
    const createWrapper = (propsData, dataOverrides = {}, methodsOverrides = {}, apolloMocks = {}) => {
        return shallowMount(Player, {
            propsData,
            data() {
                return {
                    ...dataOverrides
                };
            },
            methods: methodsOverrides,
            mocks: {
                $apollo: {
                    query: jest.fn().mockResolvedValue({ data: { provision: {} } }),
                    ...apolloMocks
                }
            }
        });
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('exibe mensagem quando nenhum conteúdo é selecionado', () => {
        const wrapper = createWrapper({ content: null });
        expect(wrapper.text()).toContain('Selecione um conteúdo para visualizar');
    });

    it('chama fetchContentDetail quando a prop "content" muda', async () => {
        const fetchContentDetailSpy = jest.spyOn(Player.methods, 'fetchContentDetail').mockImplementation(() => { });
        const wrapper = createWrapper({ content: null });

        await wrapper.setProps({ content: { id: '1', type: 'image' } });
        await wrapper.vm.$nextTick();

        expect(fetchContentDetailSpy).toHaveBeenCalledWith('1');
        fetchContentDetailSpy.mockRestore();
    });

    it('exibe estado de loading enquanto busca o conteúdo', () => {
        const wrapper = createWrapper(
            { content: { id: '1', type: 'image' } },
            { loading: true },
            { fetchContentDetail: jest.fn() }
        );
        expect(wrapper.find('svg.animate-spin').exists()).toBe(true);
    });

    it('exibe mensagem de erro quando ocorre erro ao carregar o conteúdo', () => {
        const errorObj = { message: 'Erro de teste' };
        const wrapper = createWrapper(
            { content: { id: '1', type: 'image' } },
            { error: errorObj, loading: false },
            { fetchContentDetail: jest.fn() }
        );
        expect(wrapper.find('.text-xl').exists()).toBe(true);
        expect(wrapper.text()).toContain('Ocorreu um erro ao carregar o conteúdo.');
        expect(wrapper.text()).toContain(errorObj.message);
    });

    it('renderiza os detalhes do conteúdo quando os dados são carregados (imagem)', () => {
        const content = { id: '1', type: 'image' };
        const contentDetail = {
            id: '1',
            title: 'Test Image',
            description: 'Test Description',
            url: 'test.jpg',
            format: 'jpg'
        };
        const wrapper = createWrapper(
            { content },
            { contentDetail, loading: false, error: null },
            { fetchContentDetail: jest.fn() }
        );
        expect(wrapper.find('h2').text()).toContain('Test Image');
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('src')).toBe('test.jpg');
    });

    it('renderiza vídeo quando o formato é mp4', () => {
        const content = { id: '1', type: 'video' };
        const contentDetail = {
            id: '1',
            title: 'Test Video',
            description: 'Test Video Description',
            url: 'video.mp4',
            format: 'mp4'
        };
        const wrapper = createWrapper(
            { content },
            { contentDetail, loading: false, error: null },
            { fetchContentDetail: jest.fn() }
        );
        const video = wrapper.find('video');
        expect(video.exists()).toBe(true);
        const source = video.find('source');
        expect(source.attributes('src')).toBe('video.mp4');
        expect(source.attributes('type')).toBe('video/mp4');
    });

    it('renderiza PDF quando o formato é pdf', () => {
        const content = { id: '1', type: 'pdf' };
        const contentDetail = {
            id: '1',
            title: 'Test PDF',
            description: 'Test PDF Description',
            url: 'test.pdf',
            format: 'pdf'
        };
        const wrapper = createWrapper(
            { content },
            { contentDetail, loading: false, error: null },
            { fetchContentDetail: jest.fn() }
        );
        const iframe = wrapper.find('iframe');
        expect(iframe.exists()).toBe(true);
        expect(iframe.attributes('src')).toBe('test.pdf');
    });

    it('renderiza link externo quando o tipo é link', () => {
        const content = { id: '1', type: 'link' };
        const contentDetail = {
            id: '1',
            title: 'Test Link',
            description: 'Test Link Description',
            url: 'https://example.com',
            format: 'link'
        };
        const wrapper = createWrapper(
            { content },
            { contentDetail, loading: false, error: null },
            { fetchContentDetail: jest.fn() }
        );
        const link = wrapper.find('a');
        expect(link.exists()).toBe(true);
        expect(link.attributes('href')).toBe('https://example.com');
        expect(link.text()).toContain('Acessar link externo');
    });

    it('exibe mensagem para tipo de conteúdo não suportado', () => {
        const content = { id: '1', type: 'unknown' };
        const contentDetail = {
            id: '1',
            title: 'Unknown Content',
            description: 'Test Unknown Description',
            url: 'unknown.xyz',
            format: 'unknown'
        };
        const wrapper = createWrapper(
            { content },
            { contentDetail, loading: false, error: null },
            { fetchContentDetail: jest.fn() }
        );
        expect(wrapper.find('.text-gray-400').exists()).toBe(true);
        expect(wrapper.text()).toContain('Tipo de conteúdo não suportado.');
    });

    it('prioriza o "format" de contentDetail sobre o "type" da prop content', () => {
        const content = { id: '1', type: 'pdf' };
        const contentDetail = {
            id: '1',
            title: 'Test Content',
            description: 'Test Description',
            url: 'test.jpg',
            format: 'jpg'
        };
        const wrapper = createWrapper(
            { content },
            { contentDetail, loading: false, error: null },
            { fetchContentDetail: jest.fn() }
        );
        expect(wrapper.vm.contentType).toBe('jpg');
    });

    it('atualiza contentDetail com dados retornados da consulta Apollo', async () => {
        const provisionData = {
            id: '1',
            title: 'Test Apollo Content',
            description: 'Test Apollo Description',
            url: 'test-apollo.jpg',
            format: 'jpg'
        };

        const fakeQuery = jest.fn().mockResolvedValue({ data: { provision: provisionData } });
        const wrapper = createWrapper(
            { content: { id: '1', type: 'image' } },
            {},
            {},
            { query: fakeQuery }
        );

        await wrapper.vm.fetchContentDetail('1');
        await flushPromises();

        expect(fakeQuery).toHaveBeenCalled();
        expect(wrapper.vm.contentDetail).toEqual(provisionData);
    });
});
