import ContentList from '@/components/ContentList.vue'
import { mount } from '@vue/test-utils'

describe('ContentList.vue', () => {
    const contents = [
        { id: '1', title: 'Test Content 1', description: 'Description 1', cover: 'cover1.jpg' },
        { id: '2', title: 'Test Content 2', description: 'Description 2', cover: '' }
    ]

    it('renderiza a lista de conteúdos', () => {
        const wrapper = mount(ContentList, {
            propsData: { contents }
        })
        const items = wrapper.findAll('div.cursor-pointer')
        expect(items.length).toBe(contents.length)
    })

    it('emite o evento "select" ao clicar em um item', async () => {
        const wrapper = mount(ContentList, {
            propsData: { contents }
        })
        const firstItem = wrapper.findAll('div.cursor-pointer').at(0)
        await firstItem.trigger('click')
        expect(wrapper.emitted().select).toBeTruthy()
        expect(wrapper.emitted().select[0]).toEqual([contents[0]])
    })

    it('aplica classes de destaque para o conteúdo selecionado', () => {
        const selectedContent = contents[1]
        const wrapper = mount(ContentList, {
            propsData: { contents, selectedContent }
        })
        const secondItem = wrapper.findAll('div.cursor-pointer').at(1)
        expect(secondItem.classes()).toContain('bg-gray-700')
        expect(secondItem.classes()).toContain('shadow-lg')
        expect(secondItem.classes()).toContain('transform')
        expect(secondItem.classes()).toContain('scale-105')
    })

    it('exibe imagem de cover quando disponível e inicial quando não há cover', () => {
        const wrapper = mount(ContentList, {
            propsData: { contents }
        })
        const items = wrapper.findAll('div.cursor-pointer')

        const firstImg = items.at(0).find('img')
        expect(firstImg.exists()).toBe(true)
        expect(firstImg.attributes('src')).toBe('cover1.jpg')

        const secondItem = items.at(1)
        const imgInSecond = secondItem.find('img')
        expect(imgInSecond.exists()).toBe(false)
        expect(secondItem.text()).toContain(contents[1].title.charAt(0))
    })
})
